"use strict";

function createGraph() {
    const selectElement = localStorage.getItem("sampleflag");
    let xValues = [];
    let yValues = [];

    if (selectElement === '2') {
        xValues = [450.0, 490.0, 530.0, 570.0, 610.0, 650.0, 690.0, 730.0, 770.0, 810.0, 850.0, 890.0, 930.0, 970.0, 1010.0, 1050.0, 1090.0, 1130.0, 1170.0, 1210.0, 1250.0, 1290.0, 1330.0, 1370.0, 1410.0, 1450.0, 1490.0, 1530.0, 1570.0, 1610.0, 1650.0, 1690.0, 1690.0, 1730.0, 1770.0, 1810.0, 1850.0, 1890.0, 1930.0, 1970.0, 2010.0, 2050.0, 2090.0, 2130.0, 2170.0, 2210.0, 2250.0, 2290.0, 2330.0, 2370.0, 2410.0, 2450.0, 2490.0, 2530.0, 2570.0, 2610.0, 2650.0, 2690.0, 2730.0, 2770.0, 2810.0, 2850.0, 2890.0, 2930.0, 2970.0, 3010.0, 3050.0, 3090.0, 3130.0, 3170.0, 3210.0, 3250.0, 3290.0, 3330.0, 3370.0, 3410.0, 3450.0, 3490.0, 3530.0, 3570.0, 3610.0, 3650.0, 3690.0, 3730.0, 3770.0, 3810.0, 3850.0, 3890.0, 3930.0];
        yValues = [46, 11, 68, 14, 155, 21, 40, 137, 156, 68, 50, 19, 80, 370, 500, 111, 76, 81, 144, 355, 331, 294, 540, 491, 855, 2071, 1741, 929, 369, 1836, 621, 7086, 2000, 5000, 195, 82, 47, 21, 16, 17, 14, 14, 5, 8, 10, 13, 14, 15, 1, 1, 10, 9, 10, 15, 18, 18, 14, 17, 16, 26, 45, 65, 138, 253, 1500, 107, 51, 49, 32, 21, 9, 17, 18, 13, 19, 29, 3, 19, 14, 29, 29, 26, 21, 21, 23, 29, 32, 40, 30];
    }
    else {
        xValues = [450.0, 490.0, 530.0, 570.0, 610.0, 650.0, 690.0, 730.0, 770.0, 810.0, 850.0, 890.0, 930.0, 970.0, 1010.0, 1050.0, 1090.0, 1130.0, 1170.0, 1210.0, 1250.0, 1290.0, 1330.0, 1370.0, 1410.0, 1450.0, 1490.0, 1530.0, 1570.0, 1610.0, 1650.0, 1690.0, 1730.0, 1770.0, 1810.0, 1850.0, 1890.0, 1930.0, 1970.0, 2010.0, 2050.0, 2090.0, 2130.0, 2170.0, 2210.0, 2250.0, 2290.0, 2330.0, 2370.0, 2410.0, 2450.0, 2490.0, 2530.0, 2570.0, 2610.0, 2650.0, 2690.0, 2730.0, 2770.0, 2810.0, 2850.0, 2890.0, 2930.0, 2970.0, 3010.0, 3050.0, 3090.0, 3130.0, 3170.0, 3210.0, 3250.0, 3290.0, 3330.0, 3370.0, 3410.0, 3450.0, 3490.0, 3530.0, 3570.0, 3610.0, 3650.0, 3690.0, 3730.0, 3770.0, 3810.0, 3850.0, 3890.0, 3930.0];
        yValues = [24.0, 13.0, 39.0, 116.0, 38.0, 67.0, 30.0, 225.0, 23.0, 16.0, 5.0, 3.0, 6.0, 4.0, 16.0, 345.0, 124.0, 137.0, 289.0, 75.0, 49.0, 79.0, 123.0, 42.0, 18.0, 61.0, 54.0, 10.0, 28.0, 42.0, 13.0, 20.0, 122.0, 477.0, 39.0, 9.0, 4.0, 9.0, 5.0, 2.0, 0.0, 1.0, 2.0, 1.0, 1.0, 0.0, 4.0, 11.0, 13.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 5.0, 6.0, 11.0, 22.0, 36.0, 51.0, 27.0, 45.0, 52.0, 10.0, 7.0, 6.0, 6.0, 5.0, 6.0, 7.0, 7.0, 7.0, 11.0, 9.0, 181.0, 10.0, 11.0, 10.0, 11.0, 11.0, 8.0, 12.0, 1.0, 12.0];
    }
    let arr = [];
    for (let i = 0; i < xValues.length; i++) {
        arr.push({
            x: xValues[i],
            y: yValues[i]
        });
    }
    const chart = new CanvasJS.Chart("chart-container", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Intensity"
        },
        data: [{
            type: "line",
            lineColor: "yellow",
            indexLabelFontSize: 16,
            dataPoints: arr
        }]
    });
    chart.render();
}

createGraph();

// Calculator
function dis(val) {
    document.getElementById("result").value += val;
}

function solve() {
    let x = document.getElementById("result").value;
    let y = eval(x);
    document.getElementById("result").value = y;
}

function clr() {
    document.getElementById("result").value = "";
}


// Quiz
function checkAns(vary, varz, soln) {
    let x = document.getElementById(vary);
    if (x.value === soln) {
        $(varz).append('<td><img src="../images/correct.gif"></td>');
    }
    else {
        $(varz).append('<td><img src="../images/wrong.gif"></td>');
    }
}
function checkAnsInRange(vary, varz, lx, ly) {
    let x = document.getElementById(vary);
    if (x.value >= lx && x.value <= ly) {
        $(varz).append('<td><img src="../images/correct.gif"></td>');
    }
    else {
        $(varz).append('<td><img src="../images/wrong.gif"></td>');
    }
}

function checkAnsInRangeAndAddImage(vary, varz, lx, ly, text) {
    let x = document.getElementById(vary);
    if (x.value >= lx && x.value <= ly) {
        $(varz).append('<td><img src="../images/correct.gif"></td>');
    }
    else {
        $(varz).append('<td><img src="../images/wrong.gif"></td>');
    }
}
