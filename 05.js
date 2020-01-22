const Http = require('http');
const Https = require('https')

/*Https.get('https://httpbin.org/get', res => {
    console.log(res.headers);
}) */

const data = {
    author_id: 43,
    title: 'Lorem ipsum',
    body: '<p><strong>Lorem ipsum</strong> dolor sit amet</p>',
    created_at: (new Date()).toISOString(),
    tags: ['hello', 'world'],
  }
  
Https.request({
    host: 'httpbin.org',
    port: 433,
    path: '/post',
    method: 'Post'    
}, res => {
    console.log(res);
})