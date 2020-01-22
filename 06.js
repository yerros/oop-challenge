class Auth {
    constructor(){
        this.currentUser = [],
        this.userData = [
            { id : 1, username: 'root', password: 'secret'},
            { id : 2, username: 'yeris', password: 'ganteng'}
        ]
    }
    static login(obj){
        for(let i=0; i < userData.length; i++){
            if(userData[i].username == obj.username && userData[i].password == obj.password){
                return currentUser.push(userData[i])
            } 
        }
        return currentUser;
    }

    static validate(obj){
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
           return user.username == obj.username && user.password == obj.password
        })

        if(validated){
            console.log(true);
        } else {
            console.log(false);
        }
    }

    static logout(){
        if(currentUser){
            currentUser = null
            console.log('User succefully Logout')
        } else {
            console.log('Are you Logged in?')
        }
    }

    static user(){
        console.log(currentUser)
    } 

}

const userData = [
    { id : 1, username: 'root', password: 'secret'},
    { id : 2, username: 'yeris', password: 'ganteng'}
]



Auth.login({username: 'yeris', password: 'ganteng'}) 
//Auth.validate({username: 'root', password: 'secret1'}) 
//Auth.logout()
Auth.user()

//console.log(currentUser);