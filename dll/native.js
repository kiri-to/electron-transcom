var ffi = require('ffi-napi');

var dll = ffi.Library('./native', {
  'factorial': ['int', ['int']]
})

if (process.argv.length < 3) {
  console.log('Arguments: ' + process.argv[0] + ' ' + process.argv[1] + ' <max>')
  process.exit()
}

var output = dll.factorial(parseInt(process.argv[2]))

console.log('Your output: ' + output)