const { exec } = require('../db/mysql');

//  获取博客列表
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title lick '%${keyword}%' `;
    }
    sql += `order by createtime desc;`;

    // 返回 promise
    return exec(sql);

    // 假数据
    // return [{
    //         id: 1,
    //         title: '标题A',
    //         content: '内容A',
    //         createTime: 1546610491112,
    //         author: 'zhangsan',
    //     },
    //     {
    //         id: 1,
    //         title: '标题A',
    //         content: '内容A',
    //         createTime: 1546610491112,
    //         author: 'lisi',
    //     },
    // ];
};




// 获取博客详情
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`;
    return exec(sql).then(rows => {
        return rows[0]
    })

    // return {
    //     id: 1,
    //     title: '标题A',
    //     content: '内容A',
    //     createTime: 1546610491112,
    //     author: 'zhangsan',
    // };
};




// 新建博客
const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author属性
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `

    return exec(sql).then(insertData => {

        return {
            id: insertData.insertId
        }
    })

    // return {
    //     id: 3, //表示新建博客， 插入到数据表里面的id
    // };
};





// 更新博客
const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    title = blogData.title
    content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id};
    `

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    });
};





// 删除博客
const delBlog = (id, author) => {
    // id 就是要删除博客的id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
};