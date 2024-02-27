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

const initSciChart1 = async () => {

    // Initialize SciChartSurface. Don't forget to await!
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
               { offset:"0", color:"black" },
            //    { offset:"0.0001", color:"DarkBlue" },
               { offset:"0.2", color:"CornflowerBlue" },
               { offset:"0.45", color:"DarkGreen" },
               { offset:"0.5", color:"Chartreuse" },
               { offset:"0.7", color:"Yellow" },
               { offset:"0.9", color:"Red" }
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

// initSciChart1();
initSciChart2().then(()=>{
    // updateChart2();
    updateChart2ByWorker();
});
initSciChart3().then(()=>{
    // updateChart3(); raw.readSpectrumForever();
    updateChart3ByWorker();
});
initSciChart4().then(()=>{updateChart4ByWorker()})