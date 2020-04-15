const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'post') {
        // 数据格式
        console.log('content-type', req.headers['content-type']);

        // 接收数据
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            console.log(postData);
            res.end('hello world'); // 在这里返回，因为是异步
        });
    }
});

server.listen(3000)