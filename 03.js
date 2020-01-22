const fs = require('fs')
class Log {
    static run(){
        const date = new Date()
        const logs = `
        [${date.toJSON()}] INFO: This is an information about something
        [${date.toJSON()}] ERROR: We can't divide any numbers by zero
        [${date.toJSON()}] NOTICE: Someone loves your status.
        [${date.toJSON()}] WARNING: Insufficient funds.
        [${date.toJSON()}] DEBUG: This is debug message.
        [${date.toJSON()}] ALERT: Achtung! Achtung!
        [${date.toJSON()}] CRITICAL: Medic!! We've got critical damages.
        [${date.toJSON()}] EMERGENCY: System hung. Contact system administrator immediately!`
        return fs.writeFileSync('app.log', JSON.stringify(logs) )
    }
}


console.log(Log.run());