# electron-transcom

## 使用方式
- 安装项目依赖
```
 pnpm install   
```
- webpack打包
```
 pnpm build   
```
- 运行
```
 pnpm start 
```
- 打包成本机程序
```
 npm run distdir    //打包成exe
 npm run dist       //打包成安装包
```

## 踩坑记录
- npm安装依赖时总出问题，pnpm很好用，安装方式: npm -g install pnpm
- 若pnpm安装依赖时网络有问题，可以使用cnpm(默认使用淘宝镜像的pnpm) 安装方式: npm -g install cnpm
- pnpm dist 命令有默认行为，会打包成一个zip，所以用npm run dist
- 使用dist命令打包时，若出现获取github包报错信息可参考：[electron-builder打包采坑问题汇总](https://zhuanlan.zhihu.com/p/248742896)
- cl编译cpp时，记得配INCLUDE，LIB这两个环境变量，别配到PATH了