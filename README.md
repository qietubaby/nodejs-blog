# nodejs博客项目

## 搭建开发环境

- nodemon 监测文件变化，自动重启node
- 使用 cross-env 设置环境变量，兼容 mac linux 和 windows

## 开发接口
- 初始化路由
- 返回数据


## 数据库
- 数据库工具 workbench

```
use myblog;

-- show tables; //注释一条语句

// password是关键字所以用``括起来（workbench中）
insert into users (username, `password`, realname) values ('zhangsan','123','张三')

select * from users;

select id,username from users;

select * from users where username='zhangsan' and `password`='123';

select * from users where username='zhangsan' or `password`='123';

select * from users where username like '%zhang%';

select * from users where username like '%zhang%' order by id desc;


update users set realname='李四2' where username='lisi';

//更新数据不成功，可以先接触安全模式
SET SQL_SAFE_UPDATES = 0; 

// 删除
delete from users where username='lisi';

// 通常在实际工作中一般不真正删除，而是做标记，比如state=0表示删除  
select * from users where state='1';

// <>表示 不等于'0'
select * from users where state<>'0';

软删除
update users set state='0' where username='lisi'

insert into blogs (title, content, createtime, author) values ('标题','xx',1548544875123,'lisi')


select * from blogs where title like '%标题%' author='lisi' order by createtime desc;

// 数据库版本
select version(); 

// varchar(10) 表示可以存储10个汉字，前提是mysql版本是>=5
````