// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log('this is preload.js');

const path = require('path');
const ffi = require('ffi-napi');
window.dll = ffi.Library(path.join(__dirname, 'native'), {
    'factorial': ['int', ['int']]
})



