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
    'readSpectrumForever':['void',[]],
    'getFpgaInterrupt':['void',['char *']]
})

//加载TranscomApi
window.transcom = ffi.Library('TranscomApi', {
    'Device_Init':['int',[]],
    'IQ_GetData_InFreeRun':['int',['char *','double']],
    'IQ_GetData_InTrigger':['int',['char *','int','double','double']],
    'Spectrum_GetData':['int',['char *']],
    'Persistence_GetData':['int',['char *']],
    'RunningMode_SelectTriggerSource':['int',['uchar','double','double','double','double','uint']],
    'RunningMode_ResetTriggerStatus':['int',['uchar','double']],
    'RunningMode_SetFrequencyMask':['int',['bool','double','double','float *','int']]
})

//Open Device
window.Device_Init= false;
setTimeout(()=>{
console.time('Device_Init')
if(transcom.Device_Init()==1){
    Device_Init = true;
    console.log('Device_Init success');
}
else
    console.log('Device_Init failed');
console.timeEnd('Device_Init')
},100)