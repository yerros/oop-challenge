const crypto = require('crypto')

class Hash {
    
    static md5(value){
        const toMd5 = crypto.createHash('md5')
        const hash = toMd5.update(value).digest('hex')
        console.log(hash);
    }

    static sha1(value){
        const toSha1 = crypto.createHash('sha1')
        const hash = toSha1.update(value).digest('hex')
        console.log(hash);
    }

    static sha256(value){
        const toSha256 = crypto.createHash('sha256')
        const hash = toSha256.update(value).digest('hex')
        console.log(hash);
    }

    static sha512(value){
        const toSha512 = crypto.createHash('sha512')
        const hash = toSha512.update(value).digest('hex')
        console.log(hash);
    }

}

Hash.sha512('secret');