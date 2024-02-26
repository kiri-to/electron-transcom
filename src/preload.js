console.log('this is preload.js');

window.path = require('path');
const ffi = require('ffi-napi');
window.fs = require('node:fs')

//获取示例IQ数据文件地址
window.iqPath = path.join(__dirname,'../assets/IQ_CF@92.209521MHz_SR@256kHz_20231030162048.dat');

//将dll路径添加到环境变量中
process.env.PATH+= path.join(__dirname, '../dist');

//加载raw
window.raw = ffi.Library('raw', {
    'factorial': ['int', ['int']],
    'lg': ['float *', ['int', 'float *']],
    'hello':['string',['string']],
    'fftShift':['bool',['int','short*']],
    'fftiqShift':['bool',['int','short*','short*']],
    'readSpectrumForever':['void',[]]
})

//加载TranscomApi
window.transcom = ffi.Library('TranscomApi', {
    'Device_Init':['int',[]],
    'IQ_GetData_InFreeRun':['int',['char *','double']],
    'Spectrum_GetData':['int',['char *']]
})

//Open Device
console.time('Device_Init')
if(transcom.Device_Init()==1)
    console.log('Device_Init success');
else
    console.log('Device_Init failed');
console.timeEnd('Device_Init')