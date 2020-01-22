const crypto = require('crypto')

class Cipher {

    static encrypt(value, password){
        const key = crypto.scryptSync(password, 'salt', 24)
        const iv = Buffer.alloc(16, 0)
        const icipher = crypto.createCipheriv('aes-192-cbc', key, iv)
        let encrypted = icipher.update(value, 'utf8', 'hex')
        encrypted += icipher.final('hex')
        //console.log(key);
        //console.log(`Anyone without password can't read this message`);
        return encrypted
        
    }

    static decrypt(value, password){
        const key = crypto.scryptSync(password, 'salt', 24)
        const iv = Buffer.alloc(16, 0)
        const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv)
        let decrypted = decipher.update(value, 'hex', 'utf8')
        decrypted += decipher.final('utf8');
        return decrypted
    }
    
}

const message = Cipher.encrypt('Ini tulisan rahasia', 'p4$$w0rd')

console.log(message) // Anyone without password can't read this message

const decryptedMessage = Cipher.decrypt(message, 'p4$$w0rd')

console.log(decryptedMessage) // Ini tulisan rahasia


