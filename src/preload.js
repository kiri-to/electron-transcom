// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log('this is preload.js');

window.path = require('path');
const ffi = require('ffi-napi');
window.fs = require('node:fs')


//将dll路径添加到环境变量中
process.env.PATH+= path.join(__dirname, '../dist');

window.dll = ffi.Library('raw', {
    'factorial': ['int', ['int']],
    'lg': ['float *', ['int', 'float *']],
    'hello':['string',['string']],
    'fftShift':['bool',['int','short*']],
    'fftiqShift':['bool',['int','short*','short*']]
})

window.iqPath = path.join(__dirname,'../assets/IQ_CF@92.209521MHz_SR@256kHz_20231030162048.dat');


console.log(dll.hello('kiri-to'));
