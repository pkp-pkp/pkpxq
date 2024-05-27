## 皮卡皮星球

> 论坛类项目
>
> 作者：PanKunpeng
>
> 联系方式：2643139637（QQ）
>
> 大学毕设项目，使用请联系作者
> 免责声明：作者直接将代码放上去了，如果有敏感信息，请告知去除，并且禁止使用，否则将自己承担后果
介绍：

### 技术栈

前台：uniapp  vue3 pinia...组件库-uv-ui
后台：vue2 vuex ... 组件库-element-ui
后端：nodejs express 

### 项目目录

pkpxq_admin: 后台管理

启动方式：
    1.npm install  
    2.npm run dev

pkpxq_server：nodejs后端

​	数据库文件：数据库/pkpxq.sql

​	启动方式：

​		1. 先导入数据库，在utils/config.js 配置数据库账号密码信息

​		2. npm install

                3. node app.js

pkpxq_uniapp：uniapp工程，导入直接编译即可，仅支持微信小程序

pkpxq_wx：uniapp编译后的wx目录，直接导入微信小程序，必要时可以修改project.config.json的appid为你自己的


运行失败请注意！！！！ 
问题1：作者的mysql是 8+版本，node是16.x，如果数据库执行语句报错两个原因
1.mysql版本过低，升级mysql
2.需要打开 my.ini文件，在[mysqld]下一行输入
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
3.重启mysql，重启项目

问题2：pkpxq_admin 的npm i后，npm run dev 启动报错，
解决方法：切换node版本为 16.20.2

### 截图

懒得搞了，直接将自己答辨用的视频放上去了

演示.mp4

### 最后附上接口文档
[接口文档](https://apifox.com/apidoc/shared-5360ccd6-cc9e-4e3b-abb6-09c3b24ae1dd)