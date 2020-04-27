const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    return [{
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: 'zhangsan',
        },
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: 'lisi',
        },
    ];
};

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: 'zhangsan',
    };
};

// 新建博客
const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性

    return {
        id: 3, //表示新建博客， 插入到数据表里面的id
    };
};

// 更新博客
const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性
    return true;
};

// 删除博客
const delBlog = (id) => {
    // id 就是要删除博客的id
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
};