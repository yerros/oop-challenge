const data = {
  username: "mul14344",
  email: "email@email.com",
  name: "Mulia",
  zip: 7,
  is_admin: true,
  age: 28
};

const rules = {
  username: "required|alphanum",
  email: "required|email",
  name: "required",
  zip: "required|numeric",
  is_admin: "boolean",
  age: "numeric|min:21"
};

const message = {
  required: "The %s field is required.", // Message will be "The username field is required."
  age: "The %s field must a number." // The age field must a number.
};

class Validator {
  constructor(data, rules, message) {
    this.data = data;
    this.rules = rules;
    this.message = message;
  }

  passes() {
    this.rule(data.username, "username");
    this.rule(data.email, "email");
    this.rule(data.name, "name");
    this.rule(data.zip, "zip");
    this.rule(data.is_admin, "admin");
    this.rule(data.age, "age");
  }

  messages = type => {
    return `The ${type} field is required.`;
  };

  rule = (value, type) => {
    // check username
    const checkUsername = username => {
      const regex = /^[a-z0-9]+$/i;
      const result = username.match(regex);
      if (result == null) {
        return this.messages(type);
      } else {
        return true;
      }
    };
    // check email
    const checkEmail = email => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = email.match(regex);
      if (result == null) {
        return this.messages(type);
      } else {
        return true;
      }
    };
    // Check Name
    const checkName = name => {
      const regex = /^[a-z0-9]+$/i;
      const result = name.match(regex);
      if (result == null) {
        return this.messages(type);
      } else {
        return true;
      }
    };
    // Check Zip
    const checkZip = zips => {
      if (zips == !Number) {
        return this.messages(type);
      } else {
        return true;
      }
    };
    // Check Admin
    const checkAdmin = admin => {
      if (admin == !Boolean) {
        return this.messages(type);
      } else {
        return true;
      }
    };
    // check Age
    const checkAge = age => {
      if (age == !Number && age < 21) {
        return "The Age field must a number.";
      } else {
        return true;
      }
    };
    if (type == "username") {
      console.log(checkUsername(value));
    } else if (type == "email") {
      console.log(checkEmail(value));
    } else if (type == "name") {
      console.log(checkName(value));
    } else if (type == "zip") {
      console.log(checkZip(value));
    } else if (type == "admin") {
      console.log(checkAdmin(value));
    } else if (type == "age") {
      console.log(checkAge(value));
    }
  };
}

const validator = new Validator(data, rules, message);

validator.passes();
