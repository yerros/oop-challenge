const fs = require('fs')
class Log {
    constructor(){
        this.date = new Date()
    }
    info(){
        return this.save(`[${this.date.toJSON()}] INFO: This is an information about something`)
    }
    
    error() {
        return this.save(`[${this.date.toJSON()}] ERROR: We can't divide any numbers by zero`)
    }
    
    notice() {
        return this.save(`[${this.date.toJSON()}] NOTICE: Someone loves your status.`)
    }
    
    warning() {
        return this.save(`[${this.date.toJSON()}] NOTICE: Someone loves your status.`)
    }
    
    debug() {
        return this.save(`[${this.date.toJSON()}] DEBUG: This is debug message.`)
    }
    critical() {
        return this.save(`[${this.date.toJSON()}] CRITICAL: Medic!! We've got critical damages.`)
    }
    emergency() {
        return this.save(`[${this.date.toJSON()}] EMERGENCY: System hung. Contact system administrator immediately!`)
    }

    save(param){
        fs.appendFile('app.log', param+'\n', (err) => {
            if(err) throw err;
            console.log('saved');
        })
    }

    find(by,at){
        console.log(by);
        const data = fs.readFileSync('app.log', 'utf-8').split('\n')
        let arr = data.filter(a => a.includes(by) && a.includes(at))
        //arr.filter(a => a.includes(at))
        console.log(arr);
    }
    
}

const log = new Log()

// log.info();
// log.emergency();
// log.error();
// log.warning();
log.find('EMERGENCY', '2022-01')
