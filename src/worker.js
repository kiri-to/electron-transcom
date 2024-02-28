if(self.name=='chart2')
onmessage = (e)=>{
    let iqData = new Int8Array(e.data[0])
    let iData = new Int8Array(e.data[1])
    let qData = new Int8Array(e.data[2])
       
    for(let i=0;i<iData.byteLength;i+=2){
        iData[i] = iqData[i*2]
        iData[i+1] = iqData[i*2+1]
        qData[i] = iqData[i*2+2]
        qData[i+1] = iqData[i*2+3]
    }

    postMessage([iqData.buffer,iData.buffer,qData.buffer],[iqData.buffer,iData.buffer,qData.buffer])
}



if(self.name=='chart3'){
    const ffi = require('ffi-napi');
    transcom = ffi.Library('TranscomApi', {
        'Spectrum_GetData':['int',['char *']]
    })

    let t = Buffer.alloc(4096)
    let i =0;
    while(1){
        transcom.Spectrum_GetData(t)
        if(++i%10==0){
            postMessage(t.buffer)
        }
    }
}


if(self.name=='chart4'){
    const ffi = require('ffi-napi');
    transcom = ffi.Library('TranscomApi', {
        'Persistence_GetData':['int',['char *']]
    })

    const zValue = Array(512).fill(Array(1024).fill(0));
    const persistenceData = Buffer.alloc(1024*512*4);
    onmessage = (e)=>{
        transcom.Persistence_GetData(persistenceData);
        for(let i=0;i<512;i++){
            zValue[i] = Array.from(new Float32Array(persistenceData.buffer, i*1024*4, 1024));
        }
        postMessage(zValue)
    }
}