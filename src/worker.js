//加载dll
const ffi = require('ffi-napi');
raw = ffi.Library('raw', {
    'factorial': ['int', ['int']],
    'lg': ['float *', ['int', 'float *']],
    'hello':['string',['string']],
    'fftShift':['bool',['int','short*']],
    'fftiqShift':['bool',['int','short*','short*']],
    'readSpectrumForever':['void',[]],
    'getFpgaInterrupt':['void',['char *']]
})
transcom = ffi.Library('TranscomApi', {
    'Device_Init':['int',[]],
    'IQ_GetData_InFreeRun':['int',['char *','double']],
    'IQ_GetData_InTrigger':['int',['char *','int','double','double']],
    'Spectrum_GetData':['int',['char *']],
    'Persistence_GetData':['int',['char *']],
    'RunningMode_SelectTriggerSource':['int',['uchar','double','double','double','double','uint']],
    'RunningMode_ResetTriggerStatus':['int',['uchar','double']],
    'RunningMode_SetFrequencyMask':['int',['bool','double','double','float *','int']]
})




if(self.name=='chart2'){
    let mode = 'freeRun'
    let count = 122880;
    let iqData = new Buffer.alloc(count*4);
    let iData = new Buffer.alloc(count*2);
    let qData = new Buffer.alloc(count*2);  
    let intrData = Buffer.alloc(4);

    let setTriggerOffset=0.02;
    let span = 614.4E6;
    let triggerCount = setTriggerOffset * span / 25;
    const iqDataTrigger = new Buffer.alloc(triggerCount);

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

        transcom.RunningMode_ResetTriggerStatus(2,0.1);
        raw.getFpgaInterrupt(intrData);

        console.log("get Interrupt: ",intrData);

        transcom.IQ_GetData_InTrigger(iqDataTrigger, 0, setTriggerOffset, span);
        
        console.log('end getInTrigger')
        
        iData = Buffer.alloc(triggerCount / 2);
        qData = Buffer.alloc(triggerCount / 2);
        for(let i=0;i<triggerCount / 2;i+=2){
            iData[i] = iqDataTrigger[i*2]
            iData[i+1] = iqDataTrigger[i*2+1]
            qData[i] = iqDataTrigger[i*2+2]
            qData[i+1] = iqDataTrigger[i*2+3]
        }
        postMessage([iData.buffer, qData.buffer,'trigger'], [iData.buffer, qData.buffer])
        console.log("end getInTrigger")
    }

    onmessage = (e)=>{
        if(e.data[2]!=undefined){
            mode = e.data[2];  
            console.log('iq get mode: ', mode)
        }
        if(mode=='freeRun') getFreeRun(e);
        if(mode=='freeRunCpy') getFreeRunCpy();
        if(mode=='trigger') getInTrigger(e);
    }
}


if(self.name=='chart3'||self.name=='chart2_1'){
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
    console.log("start monitor interrupt");
    let data = Buffer.alloc(4);
    while(1){
        transcom.RunningMode_ResetTriggerStatus(2,0.1);
        raw.getFpgaInterrupt(data);
        console.log("get Interrupt: ",data);
    }
}
