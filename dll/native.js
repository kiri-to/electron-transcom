var ffi = require('ffi-napi');
var path = require('path')

var dll = ffi.Library(path.join(__dirname,'./native'), {
  'factorial': ['int', ['int']],
  'lg': ['float *', ['int', 'float *']],
  'hello':['string',['string']]
})

//test factorial
console.log(dll.factorial(5))

//test hello
console.log(dll.hello('hello worrlddd'))

//test lg
var buf = new Buffer.alloc(4e3);
for (var i = 0; i < 1e3; i++) {
  buf.writeFloatLE(i+1,i*4);
}
console.log(buf)
console.log(dll.lg(1e3,buf))
console.log(buf)
