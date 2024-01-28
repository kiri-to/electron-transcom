var ffi = require('ffi-napi');

var libfactorial = ffi.Library('./libfactorial', {
  'factorial': ['int', ['int']],
  'lg': ['int*', ['int', 'int*']]
})

if (process.argv.length < 3) {
  console.log('Arguments: ' + process.argv[0] + ' ' + process.argv[1] + ' <max>')
  process.exit()
}

var output = libfactorial.factorial(parseInt(process.argv[2]))

console.log('Your output: ' + output)
console.log(libfactorial.lg(1,2))