const fs = require('node:fs');

//read i and q
iq = fs.readFileSync('../assets/IQ_CF@92.209521MHz_SR@256kHz_20231030162048.dat')
iq_i=new Buffer.allocUnsafe(iq.length/2)
iq_q=new Buffer.allocUnsafe(iq.length/2)
for (let i = 0; i < iq.length/4; i++) {
    iq_i[2*i]=iq[4*i];
    iq_i[2*i+1]=iq[4*i+1];
    iq_q[2*i]=iq[4*i+2];
    iq_q[2*i+1]=iq[4*i+3];
}

const path = require('path');
const ffi = require('ffi-napi');
process.env.PATH+= path.join(__dirname, '../dist');

var dll = ffi.Library('native', {
    'factorial': ['int', ['int']],
    'lg': ['float *', ['int', 'float *']],
    'hello':['string',['string']],
    'fftiqShift':['bool',['int','short*','short*']]
})

console.log(iq)
dll.fftiqShift(iq.length/4,iq_i,iq_q)
