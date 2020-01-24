const data = {
  username: "mul14344",
  email: "email@email.com",
  name: "Mulia",
  zip: 7000,
  is_admin: true,
  age: 90
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
    this.runCheck(data.username, rules.username);
    this.runCheck(data.email, rules.email);
    this.runCheck(data.name, rules.name);
    this.runCheck(data.zip, rules.zip);
    this.runCheck(data.is_admin, rules.is_admin);
    this.runCheck(data.age, rules.age);
  }

  runCheck = (value, rule) => {
    const rules = rule.split("|");
    if (rules.length >= 2) {
      rules.map(item => {
        const result = this.check(value, item);
        console.log(result);
      });
    } else {
      const result = this.check(value, rule);
      console.log(result);
    }
  };

  check = (value, rule) => {
    if (rule == "required") {
      if (!value) {
        return this.messages();
      } else {
        return true;
      }
    } else if (rule == "alphanum") {
      const regex = /^[a-z0-9]+$/i;
      const result = value.match(regex);
      if (result == null) {
        return this.messages();
      } else {
        return true;
      }
    } else if (rule == "email") {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = value.match(regex);
      if (result == null) {
        return this.messages();
      } else {
        return true;
      }
    } else if (rule == "numeric") {
      if (typeof value == "number") {
        return true;
      } else {
        return this.messages();
      }
    } else if (rule == "boolean") {
      if (typeof value == "boolean") {
        return true;
      } else {
        return this.messages();
      }
    } else if (rule == "min:21") {
      if (value <= 21) {
        return this.messages();
      } else {
        return true;
      }
    } else {
      return "belum di isi";
    }
  };

  messages = () => {
    return `The %s field is required.`;
  };
}

const validator = new Validator(data, rules, message);

validator.passes();
