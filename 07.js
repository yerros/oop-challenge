const data = {
  username: "mul14344",
  email: "email@email.com",
  name: "Mulia",
  zip: 7144,
  is_admin: false,
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
    this.passesmessage = [];
    this.errors = [];
    this.fail = [];
    this.autoRun();
  }

  autoRun() {
    const formessage = this.getProp(this.data);
    this.runCheck(data.username, rules.username, formessage[0]);
    this.runCheck(data.email, rules.email, formessage[1]);
    this.runCheck(data.name, rules.name, formessage[2]);
    this.runCheck(data.zip, rules.zip, formessage[3]);
    this.runCheck(data.is_admin, rules.is_admin, formessage[4]);
    this.runCheck(data.age, rules.age, formessage[5]);
  }
  getProp(value) {
    const prop = Object.keys(value);
    return prop;
  }
  passes() {
    console.log(this.passesmessage);
  }

  fails() {
    console.log(this.fail);
  }
  error() {
    console.log(this.errors);
  }

  runCheck = (value, rule, type) => {
    const rules = rule.split("|");
    if (rules.length >= 2) {
      rules.map(item => {
        const result = this.check(value, item, type);
        return result;
      });
    } else {
      const result = this.check(value, rule, type);
      return result;
    }
  };

  check = (value, rule, type) => {
    if (rule == "required") {
      if (!value) {
        this.fail.push({ [type]: true });
        this.errors.push(this.messages(type));
        return this.messages(type);
      } else {
        this.passesmessage.push({ [type]: true });
      }
    } else if (rule == "alphanum") {
      const regex = /^[a-z0-9]+$/i;
      const result = value.match(regex);
      if (result == null) {
        this.fail.push({ [type]: true });
        this.errors.push(this.messages(type));
        return this.messages(type);
      } else {
        this.passesmessage.push({ [type]: true });
      }
    } else if (rule == "email") {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = value.match(regex);
      if (result == null) {
        this.fail.push({ [type]: true });
        this.errors.push(this.messages(type));
        return this.messages(type);
      } else {
        this.passesmessage.push({ [type]: true });
      }
    } else if (rule == "numeric") {
      if (typeof value == "number") {
        this.passesmessage.push({ [type]: true });
      } else {
        this.fail.push({ [type]: true });
        this.errors.push(this.messages(type));
        return this.messages(type);
      }
    } else if (rule == "boolean") {
      if (typeof value == "boolean") {
        this.passesmessage.push({ [type]: true });
      } else {
        this.fail.push({ [type]: true });
        this.errors.push(this.messages(type));
        return this.messages(type);
      }
    } else if (rule == "min:21") {
      if (value <= 21) {
        this.fail.push({ [type]: true });
        this.errors.push(this.messages(type));
        return this.messages(type);
      } else {
        this.passesmessage.push({ [type]: true });
      }
    } else {
      return "belum di isi";
    }
  };

  messages = type => {
    return `The ${type} field is required.`;
  };
}

const validator = new Validator(data, rules, message);

validator.passes();
