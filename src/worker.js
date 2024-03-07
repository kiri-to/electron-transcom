if(self.name=='chart2'){
    const ffi = require('ffi-napi');
    transcom = ffi.Library('TranscomApi', {
        'IQ_GetData_InFreeRun':['int',['char *','double']],
        'IQ_GetData_InTrigger':['int',['char *','int','double','double']],
        'RunningMode_ResetTriggerStatus':['int',['uchar','double']]
    })

    let mode = 'freeRun'
    const count = 1e6;
    const iqData = new Buffer.alloc(count*4);
    let iData = new Buffer.alloc(count*2);
    let qData = new Buffer.alloc(count*2);  
   
    getFreeRun = (e)=>{
        transcom.IQ_GetData_InFreeRun(iqData,count)

        let iData = Buffer.from(e.data[0])
        let qData = Buffer.from(e.data[1])
        for(let i=0;i<count*2;i+=2){
            iData[i] = iqData[i*2]
            iData[i+1] = iqData[i*2+1]
            qData[i] = iqData[i*2+2]
            qData[i+1] = iqData[i*2+3]
        }
        postMessage([e.data[0], e.data[1]], [e.data[0], e.data[1]])
    }

    getFreeRunCpy = ()=>{
        transcom.IQ_GetData_InFreeRun(iqData,count)

        for(let i=0;i<count*2;i+=2){
            iData[i] = iqData[i*2]
            iData[i+1] = iqData[i*2+1]
            qData[i] = iqData[i*2+2]
            qData[i+1] = iqData[i*2+3]
        }
        postMessage([iData.buffer, qData.buffer])
    }
    
    getInTrigger = (e)=>{
        console.log('getInTrigger')
        transcom.IQ_GetData_InTrigger(iqData,0,0.02,614.4E6); 
        transcom.RunningMode_ResetTriggerStatus(3, 0.001);
        console.log('end getInTrigger')

        iData = Buffer.from(e.data[0])
        qData = Buffer.from(e.data[1])
        for(let i=0;i<count*2;i+=2){
            iData[i] = iqData[i*2]
            iData[i+1] = iqData[i*2+1]
            qData[i] = iqData[i*2+2]
            qData[i+1] = iqData[i*2+3]
        }
        postMessage([e.data[0], e.data[1]], [e.data[0], e.data[1]])
        console.log("end getInTrigger")
    }

    onmessage = (e)=>{
        if(e.data[2]!=undefined)mode = e.data[2];  
        if(mode=='freeRun') getFreeRun(e);
        if(mode=='freeRunCpy') getFreeRunCpy();
        if(mode=='trigger') getInTrigger(e);
    }
}



if(self.name=='chart3'||self.name=='chart2_1'){
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


if(self.name=='chart4'|| self.name=='chart2_2'){
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


if(self.name=='getInterrupt'){
    const ffi = require('ffi-napi');
    raw = ffi.Library('raw', {
        'getFpgaInterrupt':['void',['char *']]
    })
     
    console.log("start monitor interrupt");
    let data = Buffer.alloc(4);
    while(1){
        raw.getFpgaInterrupt(data);
        console.log("get Interrupt: ",data);
    }
}