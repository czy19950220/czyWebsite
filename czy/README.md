# czy

> 个人电脑服务器搭建网站

## Build Setup

``` bash
#如何搭建
1、将打包完成的文件放在一个没有中文的路径中
2、下载nginx，Windows版本的，在C:\....\nginx-1.10.2\conf中的nginx.conf文件中修改server中的端口和
server中location中的root，把它修改成你刚打包好的文件的路径D:\study\dist;。
3、下载神卓软件，注册登录之后就填写一下IP地址和端口号就可以了。
4、后续将往该项目里添加内容...


# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
