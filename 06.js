const userData = [
    { id : 1, username: 'root', password: 'secret'},
    { id : 2, username: 'yeris', password: 'ganteng'}
]

let currentUser 

class Auth {
    static login(obj){
        currentUser = [];
        for(let i=0; i < userData.length; i++){
            if(userData[i].username == obj.username && userData[i].password == obj.password){
                return currentUser.push(userData[i])
            } 
        }
        return currentUser;
    }

    static validate(obj){
        let validated = ''
        for(let i=0; i < userData.length; i++){
            if(userData[i].username == obj.username && userData[i].password == obj.password){ 
                validated = 'Username & Password Match'
                console.log(validated)
            } else {
                validated = 'Username & Password not Match'
                console.log(validated)
            }
        }
        //console.log(validated)
    }

    static logout(){
        if(currentUser){
            currentUser = []
            console.log('User succefully Logout')
        } else {
            console.log('Are you Logged in?')
        }
    }

    static user(){
        const userLogged = currentUser.id;
        console.log(currentUser)
    } 
}

Auth.login({username: 'yeris', password: 'ganteng'}) 
//Auth.validate({username: 'root', password: 'secret'}) 
//Auth.logout()
Auth
//Auth.user()

console.log(currentUser)