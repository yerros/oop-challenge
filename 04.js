var Datastore = require('nedb')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

class Config {
    constructor(otherClass){
        this.config = otherClass
    }

    put(prop, param){
        return this.config.insert(prop, param)
    }

    get(value){
        return this.config.get(value)
    }

    remove(value){
        return this.config.unset(value)
    }

}

class ConfigFileStorage {
    constructor(path){
        //this.path = path
        const adapter = new FileSync(path)
        const db = low(adapter)
        this.db = db
    }
    insert(prop, param){
        this.db.set(prop, param)
        .write()       
    }

    get(val){
        const res = this.db.get(val).value()
        console.log(res);
    }

    unset(val){
        this.db.unset(val).write()
    }

}

class ConfigNedb {
    constructor(path){
        this.db = new Datastore({path, autoload: true})
    }

    insert(prop, param){
        let val = {}
        val[prop] = param
        this.db.insert(val, function(err, res){
           if(res){
               console.log(res);
           } else {
               console.log(err);
           }
        })
    }

    get(val){
        this.db.find({}, function(err, res) {
            if(res){
                console.log(res);
            } else {
                console.log(err);
            }
        })
        //console.log(val);
    }
}

//const config = new Config(new ConfigFileStorage('config.json'))
const config = new Config(new ConfigNedb('config.db'))

config.put('site_name', 'Blog')         // Be able to save string.
config.put('maintenance', false)        // Be able to save boolean.
config.put('age', 30)                   // Be able to save number.
config.put('meta', {"description": "lorem ipsum"})

 config.get('site_name');
// config.put('site_name', 'Perfect Blog') 
// config.remove('site_name') 
// config.get('site_name')  