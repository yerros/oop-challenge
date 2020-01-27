class Auth {
  constructor() {
    this.currentUser = currentUser;
    currentUser = this.currentUser;
  }
  static login(obj) {
    if (currentUser.length >= 1) {
      console.log("You must logut before login again!");
    } else {
      for (let i = 0; i < userData.length; i++) {
        if (
          userData[i].username == obj.username &&
          userData[i].password == obj.password
        ) {
          console.log("User succefuly login!");
          return currentUser.push(userData[i]);
        }
      }
      return currentUser;
    }
  }

  static validate(obj) {
    // let validated = ''
    // for(let i=0; i < userData.length; i++){
    //     if(userData[i].username == obj.username && userData[i].password == obj.password){
    //         validated = 'Username & Password Match'
    //         console.log(validated)
    //     } else {
    //         validated = 'Username & Password not Match'
    //         console.log(validated)
    //     }
    // }
    //console.log(validated);

    let validated = userData.find(user => {
      return user.username == obj.username && user.password == obj.password;
    });

    if (validated) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  static logout() {
    if (currentUser.length == 0) {
      console.log("Are you Lodded in?");
    } else {
      currentUser = [];
      console.log("User succefully Logout");
    }
  }

  static user() {
    console.log(currentUser);
  }
}

const userData = [
  { id: 1, username: "root", password: "secret" },
  { id: 2, username: "yeris", password: "ganteng" }
];
let currentUser = [];

// Auth.login({ username: "root", password: "secret" });
// console.log(currentUser);
//Auth.login({ username: "root", password: "secret" });
Auth.validate({ username: "root", password: "secret" });
//Auth.logout();

// Auth.logout();
// console.log(currentUser);
