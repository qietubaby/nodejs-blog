const handleUserRouter = require('./src/router/user');
const handleBlogRouter = require('./src/router/blog');
const querystring = require('querystring');

// session 数据
const SESSION_DATA = {};

// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
        }

        // 接收数据
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        });
    });
    return promise;
};

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 获取 path
    const url = req.url;

    // const path = url.split('?')[0]
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);

    // 解析 cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;k3=v3
    cookieStr.split(';').forEach((item) => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    });


    // 处理 post data
    getPostData(req).then((postData) => {
        req.body = postData;

        // 处理blog路由
        // const blogData = handleBlogRouter(req, res);
        // if (blogData) {
        //     res.end(JSON.stringify(blogData));
        //     return;
        // }
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then((blogData) => {
                res.end(JSON.stringify(blogData));
            });
            return;
        }

        // 处理 user 路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then((userData) => {
                res.end(JSON.stringify(userData));
            });
            return;
        }

        // 未命中路由 返回 404
        res.writeHead(404, {
            'content-type': 'text/plain',
        });
        res.write('404 Not Found\n');
        res.end();
    });
};

module.exports = serverHandle;