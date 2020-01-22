const http = require('http');
//const Https = require('https')

class Http {
    static get(url){
        url = url.replace(/^https:\/\//i, 'http://');
        return new Promise((resolve, reject) => {
            http.get(url, (res, err) => {
                if(err) reject(err)
                console.log(res);
                resolve(res)
            })
        })
    }

    static post(url, dataPost){
        const postheaders = {
            'Content-Type' : 'application/json',
            'Content-Length' : Buffer.byteLength(JSON.stringify(dataPost), 'utf8')
        }
        const option = {
            host: 'httpbin.org',
            port: '80',
            path: '/post',
            method: 'POST',
            headers: postheaders
        }
        
        const promise = new Promise((resolve, reject) => {
            const req = http.request(option, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    resolve(`BODY: ${chunk}`);
                });
            })
            
            req.on('error', (e) => {
                reject(`problem with request: ${e.message}`);
            });
            
            req.write(JSON.stringify(dataPost));
            req.end();
        })
        return promise;
    }
}

// Http.get('https://httpbin.org/get').then(result => {
//     console.log(result.headers);
// }).catch((err) => {
//     console.log(err);
// })

const data = {
    author_id: 43,
    title: 'Lorem ipsum',
    body: '<p><strong>Lorem ipsum</strong> dolor sit amet</p>',
    created_at: (new Date()).toISOString(),
    tags: ['hello', 'world'],
}

Http.post('https://httpbin.org/post', data).then(response => {
  console.log(response);
})