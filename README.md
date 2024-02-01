# electron-transcom

## 使用方式
- 安装项目依赖
```
 npm run install   
```
- webpack打包
```
 npm run build   
```
- 运行
```
 npm run start 
```
- 打包成本机程序
```
 npm run distdir    //打包成exe
 npm run dist       //打包成安装包
```

## 踩坑记录
<!--
    npm安装依赖时总出问题，pnpm很好用，安装方式: npm -g install pnpm ，
    但当使用electron-builder打包时，ffi-napi的dev依赖模块不会被自动打包，故不推荐了,
    且pnpm安装时不会执行模块的install，postinstall等script命令，
    如electron时需手动执行'pnpm postinstall'来编译出dist与path.txt
-->
- 若安装依赖时网络有问题请换成国内源: npm config set registry https://registry.npmmirror.com
- 使用dist命令打包时，若出现获取github包报错信息可参考：[electron-builder打包采坑问题汇总](https://zhuanlan.zhihu.com/p/248742896)
- 安装ffi-napi时，python版本必须小于3.12
- 巨坑! 使用ffi-napi时,electron<=20.3.8,详情见:[stackoverflow](https://stackoverflow.com/questions/75668307/error-in-native-callback-using-ffi-napi-in-electron-and-electron-builder)
- cl编译cpp时，记得配INCLUDE，LIB这两个环境变量，别配到PATH了