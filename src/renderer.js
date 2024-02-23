import "./index.css"
const {
    SciChartSurface,
    NumericAxis,
    FastLineRenderableSeries,
    XyDataSeries,
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
    // dll.lg(len,y1)


    // let x1 = new Array();
    // for (var i = 0; i < 1024; i++) {
    //     x1[i] = i;
    // }
    // let y1 = new Buffer.allocUnsafe(8*1024);
    // for (var i = 0; i < 2*1024; i++) {
    //     y1.writeFloatLE(i,i*4);
    // }
    // dll.fftShift(2048,y1)


    window.iq = fs.readFileSync(iqPath)
    iq = Buffer.from(iq.buffer.slice(0,8192))
    let x1 = new Array();
    for (var i = 0; i < iq.length/4; i++) {
        x1[i] = i;
    }

    console.log(iq.buffer)
    console.log(x1.length)
    dll.fftShift(iq.length/2,iq)
    console.log(dll.hello('kiri-to'));

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

    // Add Points
    const count = 1_000_000;
    let xValues = Array.from(Array(count).keys())
    const yValues = Array.from(Array(count).keys())
    const IDS = new XyDataSeries(wasmContext,{xValues,yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false});
    const QDS = new XyDataSeries(wasmContext,{xValues,yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false});
    console.time("dataseries.appendRange(xValues,yValues) 100k points");


    // Add Lines
    const IRS = new FastLineRenderableSeries(wasmContext,{yAxisId:'y1',dataSeries:IDS ,stroke:"auto"});
    const QRS = new FastLineRenderableSeries(wasmContext, {yAxisId:'y2',dataSeries: QDS ,stroke:"auto"});
    sciChartSurface.renderableSeries.add(IRS,QRS);
    console.timeEnd("dataseries.appendRange(xValues,yValues) 100k points");
    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomExtentsModifier(),
        new RubberBandXyZoomModifier(),
        new XAxisDragModifier(),
        new YAxisDragModifier()
    );

    let tt=0;
    window.updateChart2 = ()=>{
        console.time()
        console.log(yValues)
        yValues.forEach((item,index,arr)=>{arr[index]=item+1000000;})
        IDS.appendRange(xValues.slice(900000,1000000),yValues.slice(900000,1000000));
        // setTimeout(updateChart2,10)
        console.timeEnd()
    }
}

async function initSciChart3() {
    const {sciChartSurface, wasmContext} = await SciChartSurface.create("scichart3");
    // Create an X,Y Axis and add to the chart
    const xAxis = new NumericAxis(wasmContext);
    const yAxis = new NumericAxis(wasmContext);
    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);
    // Create 5 dataseries, each with 10k points
    for (let seriesIndex = 0; seriesIndex < 5; seriesIndex++) {
        const xyDataSeries = new XyDataSeries(wasmContext);
        xyDataSeries.dataSeriesName = `Series ${seriesIndex}`
        const opacity = (1 - ((seriesIndex / 5))).toFixed(2);
        // Populate with some data
        for(let i = 0; i < 10000; i++) {
            xyDataSeries.append(i, Math.sin(i* 0.01) * Math.exp(i*(0.00001*(seriesIndex*10+1))));
        }
        // Add and create a line series with this data to the chart
        // Create a line series
        const lineSeries = new FastLineRenderableSeries(wasmContext, {
            dataSeries: xyDataSeries,
            stroke: `rgba(176,196,222,${opacity})`,
            strokeThickness:2
        });
        sciChartSurface.renderableSeries.add(lineSeries);

        sciChartSurface.chartModifiers.add(new LegendModifier({showCheckboxes: true}));

        const cursorModifier = new CursorModifier();
        cursorModifier.axisLabelsFill = "#FFFFFF";
        cursorModifier.axisLabelsStroke = "#00FF00";
        sciChartSurface.chartModifiers.add(cursorModifier);

        const tooltipModifier = new RolloverModifier(wasmContext);
        sciChartSurface.chartModifiers.add(tooltipModifier);

        // Add a drag modifier for Y Axis
        sciChartSurface.chartModifiers.add(new YAxisDragModifier());
        sciChartSurface.chartModifiers.add(new XAxisDragModifier());
    }
}

initSciChart1();
initSciChart2().then(()=>{updateChart2()});
initSciChart3();