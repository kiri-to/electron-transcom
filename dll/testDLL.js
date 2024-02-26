var ffi = require('ffi-napi');
var path = require('path')
process.env.PATH+= path.join(__dirname, '../dist');

var raw = ffi.Library('raw', {
  'factorial': ['int', ['int']],
  'lg': ['float *', ['int', 'float *']],
  'hello':['string',['string']]
})

//test factorial
console.log(raw.factorial(5))

//test hello
console.log(raw.hello('hello worrlddd'))

//test lg
var buf = new Buffer.alloc(4e3);
for (var i = 0; i < 1e3; i++) {
  buf.writeFloatLE(i+1,i*4);
}
console.log(buf)
console.log(raw.lg(1e3,buf))
console.log(buf)

const transcom = ffi.Library('TranscomApi',{
  'Device_Init':['int',[]],
  'IQ_GetData_InFreeRun':['int',['char *','double']]
})

console.log(transcom.Device_Init())
const len = 1e6;
const iqData = new Buffer.alloc(len*4);
do{
  transcom.IQ_GetData_InFreeRun(iqData,len)
  console.log(iqData)
}while(1)