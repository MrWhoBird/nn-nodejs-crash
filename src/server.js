//const http = require('http');
import http from 'http';
import fs from 'fs';


const server = http.createServer((req, res) => {
    console.log('request made');

    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data)
            res.end(data)
        }
    })
    // res.write('<p>Hello</p>');
    // res.end();
})

server.listen(3000, 'localhost', () => {
    console.log('now listening');
})