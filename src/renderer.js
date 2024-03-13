import { data } from "autoprefixer";
import "./index.scss"
const bootstrap = require("bootstrap")
const {
    SciChartSurface,
    NumericAxis,
    FastLineRenderableSeries,
    FastMountainRenderableSeries,
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
} = require('scichart')

function initNav() {
    let div1 = document.createElement("div");
    div1.innerHTML = `<svg width="100%" height="100%"><rect x="7" y="20" rx="10" ry="10" width="30" height="30" stroke="green" fill="transparent" stroke-width="5"/></svg>`
    document.querySelector("#nav").appendChild(div1);

    let div2 = document.createElement("div");
    div2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-broadcast" viewBox="0 0 16 16"><path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/></svg>`
    div2.style.paddingLeft = "7px";
    document.querySelector("#nav").appendChild(div2);

    div1.onclick = () => { initMenu1() }
    div2.onclick = () => { initMenu2() }
}
initNav();
const menu = document.querySelector("#menu")

function addChartElement(chartName) {
    const div = document.createElement("div");
    div.id = chartName;
    div.class = "scichart";
    document.getElementById("chartLayout").appendChild(div);
}

//-------------------------------------------------------- Menu 1  ------------------------------------------------------------//
function initMenu1() {
    menu.innerHTML = '';

    let charts = ["File Data", "IQ", "Spectrum", "Persistence"];
    for (let i = 1; i <= 4; i++) {
        let row = document.createElement("div");
        row.className = "row";
        row.innerHTML = `<button type="button" class="btn btn-dark">` + charts[i - 1] + `</button>`;
        row.onclick = () => { eval("switchSciChart" + i + "()") };
        menu.appendChild(row);
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
    iq = Buffer.from(iq.buffer.slice(0, 8192))
    let x1 = new Array();
    for (var i = 0; i < iq.length / 4; i++) {
        x1[i] = i;
    }

    console.log(iq.buffer)
    console.log(x1.length)
    raw.fftShift(iq.length / 2, iq)
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
    const { sciChartSurface, wasmContext } = await SciChartSurface.createSingle("scichart2");

    // Add xAxis,yAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { id: 'y1', axisTitle: "I", axisAlignment: EAxisAlignment.Left }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { id: 'y2', axisTitle: "Q", axisAlignment: EAxisAlignment.Left }));
    sciChartSurface.layoutManager.leftOuterAxesLayoutStrategy = new LeftAlignedOuterVerticallyStackedAxisLayoutStrategy(); // 使Lines沿Y轴顺序排列

    // Define iqdata
    const count = 122880;
    const iData = new ArrayBuffer(count * 2);
    const qData = new ArrayBuffer(count * 2);

    // Add Points
    const xValues = Array.from(Array(count).keys())
    const xTriggerValues = Array.from(Array(122880).keys())
    const yValues = Array(count).fill(0)
    const IDS = new XyDataSeries(wasmContext, { xValues, yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false });
    const QDS = new XyDataSeries(wasmContext, { xValues, yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false });

    // Add Lines
    const IRS = new FastLineRenderableSeries(wasmContext, { yAxisId: 'y1', dataSeries: IDS, stroke: "auto" });
    const QRS = new FastLineRenderableSeries(wasmContext, { yAxisId: 'y2', dataSeries: QDS, stroke: "auto" });
    sciChartSurface.renderableSeries.add(IRS, QRS);

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
    //TODO convert worker to worker_thread module
    window.updateChart2ByWorker = () => {
        updateChart2ByWorker.worker = new Worker("worker.js", { name: 'chart2' });
        updateChart2ByWorker.worker.onmessage = (e) => {
            // if (e.data[2] == 'trigger') {
            //     IDS.appendRange(xTriggerValues, Array.from(new Int16Array(e.data[0])));
            //     QDS.appendRange(xTriggerValues, Array.from(new Int16Array(e.data[1])));
            //     updateChart2ByWorker.worker.postMessage(1)
            // } else {
                // console.time('updateChart2')
                IDS.appendRange(xValues, Array.from(new Int16Array(e.data[0])));
                QDS.appendRange(xValues, Array.from(new Int16Array(e.data[1])));
                // console.timeEnd('updateChart2')
                updateChart2ByWorker.worker.postMessage([e.data[0], e.data[1]], [e.data[0], e.data[1]])
            // }
        }
        updateChart2ByWorker.worker.postMessage([iData, qData], [iData, qData])
    }
}

const initSciChart3 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart3")
    const { sciChartSurface, wasmContext } = await SciChartSurface.createSingle("scichart3");

    // Add xAxis,yAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

    // Define spectrum
    const count = 1024;
    let spectrum = Buffer.alloc(count * 4);

    // New DS
    const xValues = Array.from(Array(count).keys());
    const yValues = Array(count).fill(0);
    const ds = new XyDataSeries(wasmContext, { xValues, yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false });

    // Add LineSeries to the chart.
    sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, { dataSeries: ds }));

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomExtentsModifier(),
        new RubberBandXyZoomModifier(),
    );

    window.updateChart3 = () => {
        // console.time('updateChart3')
        //update spectrum data
        transcom.Spectrum_GetData(spectrum);

        // 20* log
        for (let i = 0; i < count; i++) {
            yValues[i] = 20 * Math.log10(spectrum.readUint32LE(i * 4)) - 132.95;
        }

        //update chart3
        ds.appendRange(xValues, yValues)

        //invoke after 2ms
        setTimeout(updateChart3, 2);
        // console.timeEnd('updateChart3')
    }

    window.updateChart3ByWorker = () => {
        let worker = new Worker('worker.js', { name: 'chart3' });
        worker.onmessage = (e) => {
            let t = new Uint32Array(e.data);
            for (let i = 0; i < count; i++) {
                yValues[i] = 20 * Math.log10(t[i]) - 132.95;
            }
            ds.appendRange(xValues, yValues)
        }
        // setTimeout(()=>{worker.terminate()},10000)
    }
}

const initSciChart4 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart4");
    const { sciChartSurface, wasmContext } = await SciChartSurface.createSingle("scichart4");

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
                { offset: 0, color: "Transparent" },
                { offset: 0.1, color: "#0000FF" },
                { offset: 0.2, color: "#0D8FBF" },
                { offset: 0.3, color: "#00FFFF" },
                { offset: 0.4, color: "#70AA39" },
                { offset: 0.5, color: "#00FF00" },
                { offset: 0.6, color: "#FFFF00" },
                { offset: 0.7, color: "#FF8000" },
                { offset: 0.8, color: "#FF4500" },
                { offset: 0.9, color: "#FF0000" },
                { offset: 1, color: "#FF0000" },
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

    window.updateChart4ByWorker = () => {
        const worker = new Worker('worker.js', { name: 'chart4' });
        worker.onmessage = (e) => {
            heatmapDataSeries.setZValues(e.data)
            worker.postMessage('continue')
        }
        worker.postMessage('start')
    }
}

function switchSciChart1() {
    if (document.querySelector("#scichart1")) {
        console.log("delete SciChart1");
        document.querySelector("#scichart1").remove();
    } else {
        console.log("append SciChart1");
        initSciChart1();
    }
}

function switchSciChart2() {
    if (document.querySelector("#scichart2")) {
        console.log("delete SciChart2");
        document.querySelector("#scichart2").remove();
    } else {
        console.log("append SciChart2");
        initSciChart2().then(() => {
            updateChart2ByWorker();
        });
    }
}

function switchSciChart3() {
    if (document.querySelector("#scichart3")) {
        console.log("delete SciChart3");
        document.querySelector("#scichart3").remove();
    } else {
        console.log("append SciChart3");
        initSciChart3().then(() => {
            // updateChart3(); raw.readSpectrumForever();
            updateChart3ByWorker();
        });
    }
}

function switchSciChart4() {
    if (document.querySelector("#scichart4")) {
        console.log("delete SciChart4");
        document.querySelector("#scichart4").remove();
    } else {
        console.log("append SciChart4");
        initSciChart4().then(() => {
            updateChart4ByWorker()
        })
    }
}

//      manual invoke for default     //
// switchSciChart1();  
switchSciChart2();
// switchSciChart3();  
// switchSciChart4();  

//-------------------------------------------------------- Menu 2  ------------------------------------------------------------//
function initMenu2() {
    menu.innerHTML = '';

    const row1 = document.createElement("div");
    row1.className = "row";
    row1.innerHTML =
        `<div  class="card" style="width: 20rem;">
            <button type="button" class="btn btn-dark" id="MaskTrigger">Mask Trigger</button>
            <div class="card-body" id="card2_1"><div>
        </div>`;
    // <div  class="card" style="width: 20rem;">
    //     <button type="button" class="btn btn-dark" id="DensityTrigger">Density Trigger</button>
    // </Div>
    // `;
    menu.appendChild(row1);
    document.querySelector("#MaskTrigger").onclick = () => { switchSciChart2_1() };
}

function initMenu2_1() {
    document.querySelector("#card2_1").innerHTML =
        `<div class="row">
            <div class="col">
                <input type="number" class="form-control" id="xPoint1" disabled>
            </div>
            <div class="col">
                <input type="number" class="form-control" id="yPoint1" disabled>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="number" class="form-control" id="xPoint2">
            </div>
            <div class="col">
                <input type="number" class="form-control" id="yPoint2">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="number" class="form-control" id="xPoint3">
            </div>
            <div class="col">
                <input type="number" class="form-control" id="yPoint3">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="number" class="form-control" id="xPoint4" disabled>
            </div>
            <div class="col">
                <input type="number" class="form-control" id="yPoint4" disabled>
            </div>
        </div>
        <button type="button" class="btn btn-dark" id="setFrequencyMask">Active</button>
        `
}

const initSciChart2_1 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart2_1")
    const { sciChartSurface, wasmContext } = await SciChartSurface.createSingle("scichart2_1");

    // Add xAxis,yAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

    // Define spectrum
    const count = 1024;
    let spectrum = Buffer.alloc(count * 4);

    // New DS
    const xValues = Array.from(Array(count).keys()).map(i => (i - 1023 / 2) / 1023 * 2 * 307.2e6);
    const yValues = Array(count).fill(0);
    const ds = new XyDataSeries(wasmContext, { xValues, yValues, fifoCapacity: count, dataIsSortedInX: true, dataEvenlySpacedInX: true, containsNaN: false });

    // New Mask DS
    const xPoints = [-307.2e6, -100e6, 100e6, 307.2e6];
    const yPoints = [0, -60, -60, 0];
    const maskDs = new XyDataSeries(wasmContext, { xValues: xPoints, yValues: yPoints, fifoCapacity: 4 });

    function updateMaskDs() {
        for (let i = 1; i <= 4; i++) {
            maskDs.append(xPoints[i - 1], yPoints[i - 1]);
        }
    }
    for (let i = 1; i <= 4; i++) {
        document.querySelector("#xPoint" + i).value = xPoints[i - 1];
        document.querySelector("#yPoint" + i).value = yPoints[i - 1];
        document.querySelector("#xPoint" + i).onchange = () => { xPoints[i - 1] = Number(document.querySelector('#xPoint' + i).value); updateMaskDs(); }
        document.querySelector("#yPoint" + i).onchange = () => { yPoints[i - 1] = Number(document.querySelector('#yPoint' + i).value); updateMaskDs(); }
    }

    // Add LineSeries to the chart.
    sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, { dataSeries: ds }));
    sciChartSurface.renderableSeries.add(new FastMountainRenderableSeries(wasmContext, {
        dataSeries: maskDs, stroke: '#ffa50099', strokeThickness: 3,
        zeroLineY: 100,
        fill: '#ffa50050',
        pointMarker: new EllipsePointMarker(wasmContext, {
            width: 11,
            height: 11,
            fill: "#ffa500"
        })
    }));

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add(
        new MouseWheelZoomModifier(),
        new ZoomExtentsModifier(),
        new RubberBandXyZoomModifier(),
    );

    // Active Mask
    const allMaskPoint = Buffer.alloc(1024 * 4);

    window.setFrequencyMask = () => {
        // switch device status
        transcom.RunningMode_SelectTriggerSource(2, 2.4e9, 614.4e6 / 4, 0.1, 0, 0);
        transcom.RunningMode_ResetTriggerStatus(2, 0.1);

        //update allmaskPoint
        for (let i = 0; i < 1024; i++) {
            let j = 0;
            while (xValues[i] >= xPoints[j] && j < 3) j++;
            allMaskPoint.writeFloatLE(yPoints[j - 1] + (yPoints[j] - yPoints[j - 1]) / (xPoints[j] - xPoints[j - 1]) * (xValues[i] - xPoints[j - 1]), i * 4);
        }
        console.log(new Float32Array(allMaskPoint.buffer));

        //set frequency mask
        transcom.RunningMode_SetFrequencyMask(true, 614.4e6, 500e3, allMaskPoint, 0);
        transcom.RunningMode_ResetTriggerStatus(2, 0.1);
        console.log("end setMask");

        //switch iq_chart status
        let count = 122880;
        updateChart2ByWorker && updateChart2ByWorker.worker.postMessage([new ArrayBuffer(count*2),new ArrayBuffer(count*2),'trigger']);
    }

    document.querySelector('#setFrequencyMask').addEventListener('click', setFrequencyMask);

    window.updateChart2_1ByWorker = () => {
        let worker = new Worker('worker.js', { name: 'chart2_1' });
        worker.onmessage = (e) => {
            let t = new Uint32Array(e.data);
            for (let i = 0; i < count; i++) {
                yValues[i] = 20 * Math.log10(t[i]?t[i]:1) - 132.95;
            }
 
            ds.appendRange(xValues, yValues)
        }
    }
}

const initSciChart2_2 = async () => {
    // Initialize SciChartSurface.
    addChartElement("scichart2_2")
    const { sciChartSurface, wasmContext } = await SciChartSurface.createSingle("scichart2_2");

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
                { offset: 0, color: "Transparent" },
                { offset: 0.1, color: "#0000FF" },
                { offset: 0.2, color: "#0D8FBF" },
                { offset: 0.3, color: "#00FFFF" },
                { offset: 0.4, color: "#70AA39" },
                { offset: 0.5, color: "#00FF00" },
                { offset: 0.6, color: "#FFFF00" },
                { offset: 0.7, color: "#FF8000" },
                { offset: 0.8, color: "#FF4500" },
                { offset: 0.9, color: "#FF0000" },
                { offset: 1, color: "#FF0000" },
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

    window.updateChart2_2ByWorker = () => {
        const worker = new Worker('worker.js', { name: 'chart2_2' });
        worker.onmessage = (e) => {
            heatmapDataSeries.setZValues(e.data)
            worker.postMessage('continue')
        }
        worker.postMessage('start')
    }
}

function switchSciChart2_1() {
    if (document.querySelector("#scichart2_1")) {
        document.querySelector("#card2_1").innerHTML = '';
        document.querySelector("#scichart2_1").remove();
        updateChart2ByWorker.worker.postMessage([0, 0, "freeRun"]);
        updateChart2ByWorker.worker.postMessage([0, 0, "freeRunCpy"]);
    } else {
        initMenu2_1();
        initSciChart2_1().then(() => {
            updateChart2_1ByWorker();
        });
    }
}

function switchSciChart2_2() {
    if (document.querySelector("#scichart2_2")) {
        document.querySelector("#scichart2_2").remove();
    } else {
        initSciChart2_2().then(() => {
            updateChart2_2ByWorker()
        })
    }
}

//-------------------------------------------------------- end  ------------------------------------------------------------//

window.testTrigger = () => {
    updateChart2ByWorker && updateChart2ByWorker.worker.postMessage([0, 0, "trigger"]);
}