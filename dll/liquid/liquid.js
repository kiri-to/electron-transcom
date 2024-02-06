const ffi =  require('ffi-napi');

const dll = ffi.Library('./liquid',{
    'randf':['float',[]],
    'randnf_pdf':['float',['float','float','float']]
})

while(true) console.log(dll.randnf_pdf(dll.randf(),0.2,0.5))