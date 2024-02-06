var ffi = require('ffi-napi');
// var ref = require('ref-napi')

var dll = ffi.Library('./native', {
  'factorial': ['int', ['int']],
  'lg': ['int *', ['int', 'int *']],
  'hello':['string',['string']]
})

//test factorial
console.log(dll.factorial(5))

//test hello
console.log(dll.hello('hello worrlddd'))

//test lg
var buf = new Buffer.alloc(20)
buf.writeInt32LE(1e1,0)
buf.writeInt32LE(1e2,4)
buf.writeInt32LE(1e3,8)
buf.writeInt32LE(1e4,12)
buf.writeInt32LE(1e5,16)
console.log(buf)

var t = dll.lg(5,buf)
console.log(buf)
console.log(t)

var tt =Buffer.from(t.buffer,0,20)
console.log(tt)