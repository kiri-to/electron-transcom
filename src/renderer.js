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
    ZoomExtentsModifier
}  = require('scichart')

const initSciChart = async () => {

    // Initialize SciChartSurface. Don't forget to await!
    const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-root", {
        theme: new SciChartJsNavyTheme(),
        title: "spectrum view",
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
        pointMarker: new EllipsePointMarker(wasmContext, { width: 11, height: 11, fill: "#fff" }),
        animation: new SweepAnimation({ duration: 300, fadeEffect: true })
    }));

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomPanModifier(),
        new ZoomExtentsModifier()
    );
};

initSciChart();