const Datastore = require("nedb");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mysql = require("mysql");

class Config {
  constructor(otherClass) {
    this.config = otherClass;
  }

  put(prop, param) {
    return this.config.insert(prop, param);
  }

  get(value) {
    return this.config.get(value);
  }

  remove(value) {
    return this.config.unset(value);
  }
  end() {
    this.config.connectEnd();
  }
}

class ConfigFileStorage {
  constructor(path) {
    //this.path = path
    const adapter = new FileSync(path);
    const db = low(adapter);
    this.db = db;
  }
  insert(prop, param) {
    this.db.set(prop, param).write();
  }

  get(val) {
    const res = this.db.get(val).value();
    console.log(res);
  }

  unset(val) {
    this.db.unset(val).write();
  }
}

class ConfigNedb {
  constructor(path) {
    this.db = new Datastore({ filename: path, autoload: true });
  }

  insert(prop, param) {
    let val = {};
    val[prop] = param;
    this.db.insert(val, function(err, res) {
      if (res) {
        console.log(res);
      } else {
        console.log(err);
      }
    });
  }

  get(val) {
    const value = val;
    let datareturn = "";
    this.db.find({}, function(err, res) {
      if (res) {
        const cari = res.find(a => a[value]);
        datareturn = cari;
        console.log(cari);
      } else {
        console.log(err);
      }
    });
    return datareturn;
  }

  unset(val) {
    this.db.find({}, (err, res) => {
      if (res) {
        const data = res.find(a => a[val]);
        this.db.remove(data, { multi: true }, err => {
          if (err) return err;
        });
      }
    });
  }
}

class ConfigMysql {
  constructor(auth) {
    const connection = mysql.createConnection(auth);
    connection.connect(function(err) {
      if (err) throw err;
      console.log("Database Conneted...");
    });
    this.connection = connection;
  }

  connect(auth) {}

  connectEnd() {
    this.connection.end();
  }

  async insert(prop, param) {
    const cek = `SELECT prop FROM nodejs WHERE prop = '${prop}'`;
    let q = ``;
    //const q = `INSERT INTO nodejs (prop, param) VALUES ('${prop}', '${param}')`;
    this.connection.query(cek, (err, res) => {
      if (err) throw err;
      if (res.length == 0) {
        q = `INSERT INTO nodejs (prop, param) VALUES ('${prop}', '${param}')`;
        this.connection.query(q, (err, res) => {
          if (err) throw err;
          console.log("sukses INSERT");
        });
      } else {
        q = `UPDATE nodejs SET param = '${param}' WHERE prop = '${prop}'`;
        this.connection.query(q, (err, res) => {
          if (err) throw err;
          console.log("sukses UPDATE");
        });
      }
    });
    console.log(q);
  }

  get(val) {
    const cek = `SELECT param FROM nodejs WHERE prop = '${val}'`;
    this.connection.query(cek, (err, res) => {
      if (err) throw err;
      console.log(res);
    });
  }

  unset(val) {
    const q = `DELETE FROM nodejs WHERE prop = '${val}'`;
    this.connection.query(q, (err, res) => {
      if (err) throw err;
      console.log("berhasil di hapus");
    });
  }
}
//const config = new Config(new ConfigFileStorage('config.json'))
// const config = new Config(new ConfigNedb('config.db'))

const connection = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "config"
};
const config = new Config(new ConfigMysql(connection));

config.put("site_name", "Blog"); // Be able to save string.
config.put("maintenance", false); // Be able to save boolean.
config.put("age", 30); // Be able to save number.
config.put("meta", { description: "lorem ipsum" });
//config.end();
config.get("site_name");
config.put("site_name", "Perfect Blog");
config.get("site_name");
config.remove("site_name");
// config.get('site_name')
