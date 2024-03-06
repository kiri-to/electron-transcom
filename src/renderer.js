import "./index.css"
const {
    SciChartSurface,
    NumericAxis,
    FastLineRenderableSeries,
    XyDataSeries,
    HeatmapColorMap,
    UniformHeatmapDataSeries,
    UniformHeatmapRenderableSeries,
    EllipsePointMarker,
    SweepAnimation,
    SciChartJsNavyTheme,
    NumberRange,
    MouseWheelZoomModifier,
    ZoomPanModifier,
    ZoomExtentsModifier,
    RubberBandXyZoomModifier,
    XyScatterRenderableSeries,
    LegendModifier,
    CursorModifier,
    RolloverModifier,
    XAxisDragModifier,
    YAxisDragModifier,
    LeftAlignedOuterVerticallyStackedAxisLayoutStrategy,
    EAxisAlignment
}  = require('scichart')

function initNav(){
    let div1 = document.createElement("div");
    div1.innerHTML = `<svg width="100%" height="100%"><rect x="7" y="20" rx="10" ry="10" width="30" height="30" stroke="green" fill="transparent" stroke-width="5"/></svg>`
    document.querySelector("#nav").appendChild(div1);

    let div2 = document.createElement("div");
    div2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-broadcast" viewBox="0 0 16 16"><path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/></svg>`
    div2.style.paddingLeft = "7px";
    document.querySelector("#nav").appendChild(div2);

    div1.onclick=()=>{initMenu1()}
    div2.onclick=()=>{initMenu2()}
}
initNav();

function addChartElement(chartName){
    const div = document.createElement("div");
    div.id = chartName;
    div.class = "scichart";
    document.getElementById("chartLayout").appendChild(div);
}

//-------------------------------------------------------- Menu 1  ------------------------------------------------------------//
function initMenu1(){
    const ul = document.createElement("ul");
    document.querySelector("#menu").innerHTML='';
    document.querySelector("#menu").appendChild(ul);
    
    for(let i=1;i<=4;i++){
        let li = document.createElement("li");
        li.innerHTML = "scichart"+i; 
        li.onclick=()=>{eval("switchSciChart"+i+"()")};
        ul.appendChild(li);
    }
}
initMenu1();  //manual invoke for default

const initSciChart1 = async () => {
    // Initialize SciChartSurface. Don't forget to await!
    addChartElement("scichart1");
    const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart1", {
        title: "Test Data",
        titleStyle: { fontSize: 22 }
    });

    // Create an XAxis and YAxis with growBy padding
    const growBy = new NumberRange(0.1, 0.1);
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { axisTitle: "X Axis", growBy }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { axisTitle: "Y Axis", growBy }));

    // let len = 1e7
    // let x1 = new Array();
    // let y1 = new Buffer(4*len);
    // for (var i = 0; i < len; i++) {
    //     x1[i] = i+1;
    //     y1.writeFloatLE(i+1,i*4);
    // }
    // raw.lg(len,y1)


    // let x1 = new Array();
    // for (var i = 0; i < 1024; i++) {
    //     x1[i] = i;
    // }
    // let y1 = new Buffer.allocUnsafe(8*1024);
    // for (var i = 0; i < 2*1024; i++) {
    //     y1.writeFloatLE(i,i*4);
    // }
    // raw.fftShift(2048,y1)


    window.iq = fs.readFileSync(iqPath)
    iq = Buffer.from(iq.buffer.slice(0,8192))
    let x1 = new Array();
    for (var i = 0; i < iq.length/4; i++) {
        x1[i] = i;
    }

    console.log(iq.buffer)
    console.log(x1.length)
    raw.fftShift(iq.length/2,iq)
    console.log(raw.hello('kiri-to'));

    // Create a line series with some initial data
    sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
        stroke: "steelblue",
        strokeThickness: 3,
        dataSeries: new XyDataSeries(wasmContext, {
            xValues: x1,
            yValues: Array.prototype.slice.call(new Float32Array(iq.buffer))
        }),
        // pointMarker: new EllipsePointMarker(wasmContext, { width: 11, height: 11, fill: "#fff" }),
        animation: new SweepAnimation({ duration: 300, fadeEffect: true })
    }));

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomPanModifier(),
        new ZoomExtentsModifier()
    );
};

const initSciChart2 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart2");
    const {sciChartSurface, wasmContext} = await SciChartSurface.createSingle("scichart2");

    // Add xAxis,yAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext,{id:'y1',axisTitle:"I",axisAlignment: EAxisAlignment.Left}));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext,{id:'y2',axisTitle:"Q",axisAlignment: EAxisAlignment.Left}));
    sciChartSurface.layoutManager.leftOuterAxesLayoutStrategy = new LeftAlignedOuterVerticallyStackedAxisLayoutStrategy(); // 使Lines沿Y轴顺序排列

    // Define iqdata
    const count = 1e6;
    const iqData = new Buffer.alloc(count*4);
    const iData = new Buffer.alloc(count*2);
    const qData = new Buffer.alloc(count*2);

    // Add Points
    const xValues = Array.from(Array(count).keys())
    const yValues = Array(count).fill(0)
    const IDS = new XyDataSeries(wasmContext,{xValues,yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false});
    const QDS = new XyDataSeries(wasmContext,{xValues,yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false});

    // Add Lines
    const IRS = new FastLineRenderableSeries(wasmContext,{yAxisId:'y1',dataSeries:IDS ,stroke:"auto"});
    const QRS = new FastLineRenderableSeries(wasmContext, {yAxisId:'y2',dataSeries: QDS ,stroke:"auto"});
    sciChartSurface.renderableSeries.add(IRS,QRS);

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomExtentsModifier(),
        new RubberBandXyZoomModifier(),
        new XAxisDragModifier(),
        new YAxisDragModifier()
    );

    //TODO 自己实现appendRange直接传递ArrayBuffer
    //TODO C++直接拆分好I与Q
    window.updateChart2 = ()=>{
        //get iqdata
        console.time('get iqdata')
        transcom.IQ_GetData_InFreeRun(iqData,count)
        console.timeEnd('get iqdata')

        //unpack iqData
        console.time('unpack iqData')
        for(let i=0;i<2*count;i++){
            iData[i] = iqData[i*2]
            iData[i+1] = iqData[i*2+1]
            qData[i] = iqData[i*2+2]
            qData[i+1] = iqData[i*2+3]
        }
        console.timeEnd('unpack iqData')
        
        //update chart
        console.time('updateChart2')
        IDS.appendRange(xValues, Array.from(new Int16Array(iData.buffer)));
        QDS.appendRange(xValues, Array.from(new Int16Array(qData.buffer)));
        console.timeEnd('updateChart2')

        //invoke after 10ms
        setTimeout(updateChart2, 10);

    }
    
    //TODO convert worker to worker_threadd module
    const worker = new Worker("worker.js",{name:'chart2'});
    worker.onmessage = (e) => {
        // console.timeEnd('unpack iqData')

        // //update chart
        // console.time('updateChart2')
        IDS.appendRange(xValues, Array.from(new Int16Array(e.data[1])));
        QDS.appendRange(xValues, Array.from(new Int16Array(e.data[2])));
        // console.timeEnd('updateChart2')
        
        updateChart2ByWorkerSecond(e.data[0],e.data[1],e.data[2])
    }

    window.updateChart2ByWorker = ()=>{
        //get iqdata
        transcom.IQ_GetData_InFreeRun(iqData,count)

        //unpack iqData
        console.time('post without clone')
        worker.postMessage([iqData.buffer,iData.buffer,qData.buffer],[iqData.buffer,iData.buffer,qData.buffer])
        console.timeEnd('post without clone')
    }

    const updateChart2ByWorkerSecond = (iqData,iData,qData)=>{
        //get iqdata
        // console.time('get iqData')
        transcom.IQ_GetData_InFreeRun(Buffer.from(iqData),count)
        // console.timeEnd('get iqData')

        // console.time('unpack iqData')
        worker.postMessage([iqData,iData,qData],[iqData,iData,qData])
    }
}

const initSciChart3 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart3")
    const {sciChartSurface, wasmContext} = await SciChartSurface.createSingle("scichart3");

    // Add xAxis,yAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

    // Define spectrum
    const count = 1024;
    let spectrum = Buffer.alloc(count*4);

    // New DS
    const xValues = Array.from(Array(count).keys());
    const yValues = Array(count).fill(0);
    const ds = new XyDataSeries(wasmContext,{xValues,yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false});

    // Add LineSeries to the chart.
    sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, { dataSeries: ds }));

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomExtentsModifier(),
        new RubberBandXyZoomModifier(),
    );

    window.updateChart3 = ()=>{
        // console.time('updateChart3')
        //update spectrum data
        transcom.Spectrum_GetData(spectrum);
        
        // 20* log
        for(let i=0;i<count;i++){
            yValues[i] = 20*Math.log(spectrum.readFloatLE(i*4))
        }

        //update chart3
        ds.appendRange(xValues,yValues)

        //invoke after 2ms
        setTimeout(updateChart3,2);
        // console.timeEnd('updateChart3')
    }

    window.updateChart3ByWorker = ()=>{
        let worker = new Worker('worker.js',{name:'chart3'});
        worker.onmessage = (e)=>{
            let t =new Float32Array(e.data);
            for(let i=0;i<count;i++){
                yValues[i] = 20*Math.log(t[i])
            }
            ds.appendRange(xValues,yValues)
        }
        // setTimeout(()=>{worker.terminate()},10000)
    }
}

const initSciChart4 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart4");
    const {sciChartSurface, wasmContext} = await SciChartSurface.createSingle("scichart4");

    // Add xAxis,yAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

    // Add DS
    const WIDTH = 1024;
    const HEIGHT = 512;
    const zValue = Array(HEIGHT).fill(Array(WIDTH).fill(0));
    const heatmapDataSeries = new UniformHeatmapDataSeries(wasmContext, {
        xStart: 0,
        xStep: 1,
        yStart: 0,
        yStep: 1,
        zValues: zValue
    });
   
    // Create a Heatmap RenderableSeries with the color map. ColorMap.minimum/maximum defines the values in
    // HeatmapDataSeries which correspond to gradient stops at 0..1
    const heatmapSeries = new UniformHeatmapRenderableSeries(wasmContext, {
        dataSeries: heatmapDataSeries,
        useLinearTextureFiltering: false,
        colorMap: new HeatmapColorMap({
            minimum: 0,
            maximum: 1,
            gradientStops: [
                { offset : 0, color: "Transparent"},
                { offset : 0.1, color : "#0000FF"},
                { offset : 0.2, color : "#0D8FBF"},
                { offset : 0.3, color : "#00FFFF"},
                { offset : 0.4, color : "#70AA39"},
                { offset : 0.5, color : "#00FF00"},
                { offset : 0.6, color : "#FFFF00"},
                { offset : 0.7, color : "#FF8000"},
                { offset : 0.8, color : "#FF4500"},
                { offset : 0.9, color : "#FF0000"},
                { offset : 1, color :   "#FF0000"},
            ]
        })
    });

    // Add Line
    sciChartSurface.renderableSeries.add(heatmapSeries);

    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomPanModifier(),
        new ZoomExtentsModifier()
    );

    window.updateChart4ByWorker = ()=>{
        const worker = new Worker('worker.js',{name:'chart4'});
        worker.onmessage = (e)=>{
            console.log(e.data)
            heatmapDataSeries.setZValues(e.data)
            worker.postMessage('continue')
        }
        worker.postMessage('start')
    }
}

function switchSciChart1(){
    if(document.querySelector("#scichart1")){
        console.log("delete SciChart1");
        document.querySelector("#scichart1").remove();
    }else{
        console.log("append SciChart1");
        initSciChart1();
    }
}

function switchSciChart2(){
    if(document.querySelector("#scichart2")){
        console.log("delete SciChart2");
        document.querySelector("#scichart2").remove();
    }else{
        console.log("append SciChart2");
        initSciChart2().then(()=>{
            // updateChart2();
            // updateChart2ByWorker();
        });
    }
}

function switchSciChart3(){
    if(document.querySelector("#scichart3")){
        console.log("delete SciChart3");
        document.querySelector("#scichart3").remove();
    }else{
        console.log("append SciChart3");
        initSciChart3().then(()=>{
            // updateChart3(); raw.readSpectrumForever();
            updateChart3ByWorker();
        });
    }
}

function switchSciChart4(){
    if(document.querySelector("#scichart4")){
        console.log("delete SciChart4");
        document.querySelector("#scichart4").remove();
    }else{
        console.log("append SciChart4");
        initSciChart4()//.then(()=>{updateChart4ByWorker()})
    }
}

//      manual invoke for default     //
// document.querySelector("#menu>ul>li:nth-child(1)").click();
document.querySelector("#menu>ul>li:nth-child(2)").click();     
document.querySelector("#menu>ul>li:nth-child(3)").click();
// document.querySelector("#menu>ul>li:nth-child(4)").click();

//-------------------------------------------------------- Menu 2  ------------------------------------------------------------//
function initMenu2(){
    const ul = document.createElement("ul");
    document.querySelector("#menu").innerHTML='';
    document.querySelector("#menu").appendChild(ul);
    
    let li = document.createElement("li");
    li.innerHTML = "Mask Trigger"; 
    li.onclick=()=>{switchSciChart2_1()};
    ul.appendChild(li);
}

const initSciChart2_1 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart2_1")
    const {sciChartSurface, wasmContext} = await SciChartSurface.createSingle("scichart2_1");

    // Add xAxis,yAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

    // Define spectrum
    const count = 1024;
    let spectrum = Buffer.alloc(count*4);

    // New DS
    const xValues = Array.from(Array(count).keys());
    const yValues = Array(count).fill(0);
    const ds = new XyDataSeries(wasmContext,{xValues,yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false});

    // Add LineSeries to the chart.
    sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, { dataSeries: ds }));

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomExtentsModifier(),
        new RubberBandXyZoomModifier(),
    );

    window.updateChart2_1 = ()=>{
        // console.time('updateChart3')
        //update spectrum data
        transcom.Spectrum_GetData(spectrum);
        
        // 20* log
        for(let i=0;i<count;i++){
            yValues[i] = 20*Math.log(spectrum.readFloatLE(i*4))
        }

        //update chart3
        ds.appendRange(xValues,yValues)

        //invoke after 2ms
        setTimeout(updateChart2_1,2);
        // console.timeEnd('updateChart3')
    }

    window.updateChart2_1ByWorker = ()=>{
        let worker = new Worker('worker.js',{name:'chart3'});
        worker.onmessage = (e)=>{
            let t =new Float32Array(e.data);
            for(let i=0;i<count;i++){
                yValues[i] = 20*Math.log(t[i])
            }
            ds.appendRange(xValues,yValues)
        }
    }
}

function switchSciChart2_1(){
    if(document.querySelector("#scichart2_1")){
        console.log("delete SciChart2_1");
        document.querySelector("#scichart2_1").remove();
    }else{
        console.log("append SciChart2_1");
        initSciChart2_1().then(()=>{
            // updateChart3(); raw.readSpectrumForever();
            updateChart2_1ByWorker();
        });
    }
}