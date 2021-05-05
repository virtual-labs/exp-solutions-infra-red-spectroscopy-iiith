"use strict";
const messageArr = [
    "Click on the sample to transfer the small amount(2-5mg) of the sample into the empty sample bottle",
    "Click on the solvent bottle to transfer 2 to 3 ml of the solvent(methylene chloride) to the sample to prepare a clear solution",
    "Click on the dessicator to take out the solution JR cell",
    "Click on the sample solution to draw 1ml of the solution with a dropper",
    "Click on the JR cell to transfer the sample solution until all the air is expelled from the solution cell",
    "Click on the solution JR cell to place the cell inside the spectrometer ",
    "Click start to run the spectrometer",
    "Click on Evaluate Button"
];
// flags
let sampleSelected = -1;
let sampleCollectFlag = 0;
let solventCollectFlag = 0;
let desiccatorFlag = 0;
let fillDropperFlag = 0;
let emptyDropperFlag = 0;
let preprationStageFlag = 0;
let flagLayer2 = 0;
let flagLayer3 = 0;
let flagLayer4 = 0;
let graphFlag = 0;
let evalFlag = 0;


// Sample selection
function sampleSelect(event) {
    let c = event.target.id;
    const a1 = anime.timeline({
        targets: document.getElementById('button1'),
        duration: 200,
        easing: 'linear',
    });
    const a2 = anime.timeline({
        targets: document.getElementById('button2'),
        duration: 200,
        easing: 'linear',
    });
    if (c === 'button1') {
        sampleSelected = 1;
    }
    else if (c === 'button2') {
        sampleSelected = 2;
    }
    localStorage.setItem("sampleflag", sampleSelected);
    a1.add({
        opacity: 0,
        zIndex: 0,
    });
    a2.add({
        opacity: 0,
        zIndex: 0,
    }).add({
        update: function (anim) {
            document.getElementById("message").innerHTML = messageArr[0];
        }
    });

    const a3 = anime.timeline({
        targets: document.getElementById('layer0'),
        duration: 200,
        easing: 'linear',
    }).add({
        opacity: 0,
    });
    const a4 = anime.timeline({
        targets: document.getElementById('layer1'),
        duration: 200,
        easing: 'linear',
    }).add({
        opacity: 1,
    });
}

// Layer1 - adding sample and preparing slide
function addSample() {
    if (sampleSelected != -1) {
        let a1 = anime.timeline({
            targets: document.getElementById('solution1'),
            duration: 1200,
            easing: 'linear',
        });

        a1.add({
            opacity: 1,
        }).add({
            update: function (anim) {
                document.getElementById("message").innerHTML = messageArr[1];
            }
        });
        sampleCollectFlag = 1;
    }
}

function addSolvent() {
    if (sampleCollectFlag) {
        let a1 = anime.timeline({
            targets: document.getElementById('solution2'),
            duration: 1200,
            easing: 'linear',
        });

        a1.add({
            opacity: 1,
        }).add({
            update: function (anim) {
                document.getElementById("message").innerHTML = messageArr[2];
            }
        });
        solventCollectFlag = 1;
    }
}

function addJrCell() {
    if (solventCollectFlag) {
        let a1 = anime.timeline({
            targets: document.getElementById('jr-cell'),
            duration: 1200,
            easing: 'linear'
        });
        let a2 = anime.timeline({
            targets: document.getElementById('jr-cell-heading'),
            duration: 1200,
            easing: 'linear'
        });
        a1.add({
            opacity: 1,
        }).add({
            update: function (anim) {
                document.getElementById("message").innerHTML = messageArr[3];
            }
        });
        a2.add({
            opacity: 1,
        });
        desiccatorFlag = 1;
    }
}

function fillDropper1() {
    if (desiccatorFlag) {
        let a1 = anime.timeline({
            targets: document.getElementById('dropper1'),
            duration: 300,
            easing: 'linear'
        });
        let a2 = anime.timeline({
            targets: document.getElementById('sol1'),
            delay: 300,
            duration: 900,
            easing: 'linear'
        });
        a1.add({
            opacity: 1,
        });
        a2.add({
            opacity: 1,
        });
        let a3 = anime.timeline({
            targets: document.getElementById('collected-sol1'),
            delay: 2500,
            duration: 1200,
            easing: 'linear'
        });
        a3.add({
            opacity: 0,
        }).add({
            update: function (anim) {
                document.getElementById("message").innerHTML = messageArr[4];
            }
        });
        fillDropperFlag = 1;
    }
}

function emptyDropper2() {
    if (preprationStageFlag) {
        let a1 = anime.timeline({
            targets: document.getElementById('layer1'),
            duration: 300,
            easing: 'linear'
        });
        a1.add({
            opacity: 0,
            zIndex: 0,
        });
        let a2 = anime.timeline({
            targets: document.getElementById('layer2'),
            duration: 300,
            easing: 'linear'
        });
        a2.add({
            delay: 100,
            opacity: 1,
        });
        flagLayer2 = 1;
        moveStand();
    }
    if (fillDropperFlag && preprationStageFlag != 1) {
        let a1 = anime.timeline({
            targets: document.getElementById('dropper2'),
            duration: 300,
            easing: 'linear'
        });
        let a2 = anime.timeline({
            targets: document.getElementById('sol2'),
            delay: 100,
            duration: 600,
            easing: 'linear'
        });
        let a3 = anime.timeline({
            targets: document.getElementById('slit'),
            delay: 600,
            duration: 900,
            easing: 'linear'
        });
        a1.add({
            opacity: 1,
        });
        a2.add({
            opacity: 1,
        }).add({
            opacity: 0,
        });
        a3.add({
            opacity: 1,
        }).add({
            update: function (anim) {
                document.getElementById("message").innerHTML = messageArr[5];
            }
        });
        emptyDropperFlag = 1;
        preprationStageFlag = 1;
    }
}


// Layer 2 - spectrometer
function moveStand() {
    const a1 = anime.timeline({
        targets: document.getElementById('movable'),
        duration: 1200,
        easing: 'linear',
    }).add({
        translateY: '4em',
    }).add({
        update: function (anim) {
            document.getElementById("message").innerHTML = messageArr[6];
        }
    });
}

function changeLayerThree() {
    if (flagLayer2) {
        const var1 = anime.timeline({
            targets: document.getElementById('layer2'),
            duration: 1200,
            easing: 'linear',
        });

        const var2 = anime.timeline({
            targets: document.getElementById('layer3'),
            duration: 1200,
            easing: 'linear',
        });

        var1.add({
            opacity: 0,
        }).add({
            zIndex: 0,
        });

        var2.add({
            opacity: 1,
        }).add({
            update: function (anim) {
                flagLayer2 = 0;
                flagLayer3 = 1;
                shiftIR();
            }
        });
    }
}

// layer3 - observation of spectrometer
function shiftIR() {
    if (flagLayer3) {
        const a1 = anime.timeline({
            targets: document.getElementById('line1'),
            duration: 1200,
            easing: 'linear',
        });
        const a2 = anime.timeline({
            targets: document.getElementById('line2'),
            duration: 1200,
            easing: 'linear',
        });
        const a3 = anime.timeline({
            targets: document.getElementById('line-up1'),
            duration: 1200,
            easing: 'linear',
        });
        const a4 = anime.timeline({
            targets: document.getElementById('line-up2'),
            duration: 1200,
            easing: 'linear',
        });
        const a5 = anime.timeline({
            targets: document.getElementById('line-right1'),
            duration: 1200,
            easing: 'linear',
        });
        const a6 = anime.timeline({
            targets: document.getElementById('line-right2'),
            duration: 1200,
            easing: 'linear',
        });
        const a7 = anime.timeline({
            targets: document.getElementById('line-down1'),
            duration: 1200,
            easing: 'linear',
        });
        const a8 = anime.timeline({
            targets: document.getElementById('line-down2'),
            duration: 1200,
            easing: 'linear',
        });
        a1.add({
            opacity: 1
        });
        a2.add({
            delay: 320,
            opacity: 1,
        });
        a3.add({
            delay: 800,
            opacity: 1,
        });
        a4.add({
            delay: 960,
            opacity: 1,
        });

        a5.add({
            delay: 800,
            opacity: 1,
        });
        a6.add({
            delay: 1070,
            opacity: 1,
        });

        a3.add({
            delay: 100,
            opacity: 0,
        });
        a4.add({
            opacity: 0,
        });
        a5.add({
            delay: 100,
            opacity: 0,
        });
        a6.add({
            opacity: 0,
        });

        a4.add({
            delay: 300,
            opacity: 1,
        });
        a3.add({
            delay: 610,
            opacity: 1,
        });

        a6.add({
            delay: 300,
            opacity: 1,
        });
        a5.add({
            delay: 630,
            opacity: 1,
        });

        a7.add({
            delay: 5200,
            opacity: 1,
        });

        a8.add({
            delay: 5500,
            opacity: 1,
        }).add({
            update: function (anim) {
                flagLayer3 = 0;
                flagLayer4 = 1;
                changeGraphLayer();
            }
        });
    }
}

// Layer4 - graph presentation
function changeGraphLayer() {
    if (flagLayer4) {
        const lay4 = anime.timeline({
            targets: document.getElementById('layer3'),
            duration: 1200,
            easing: 'linear',
        }).add({
            opacity: 0,
        }).add({
            zIndex: 0,
        });
        const lay5 = anime.timeline({
            targets: document.getElementById('layer4'),
            duration: 1200,
            easing: 'linear',
        }).add({
            delay: 1000,
            opacity: 1,
        }).add({
            update: function (anim) {
                flagLayer4 = 0;
                evalFlag = 1;
                createGraph();
            }
        });
    }
}

function createGraph() {
    if (graphFlag === 0) {
        let xValues = [];
        let yValues = [];
        const a22 = anime.timeline({
            targets: document.getElementById('message'),
            easing: 'linear',

        });
        if (sampleSelected === 2) {
            xValues = [450.0, 490.0, 530.0, 570.0, 610.0, 650.0, 690.0, 730.0, 770.0, 810.0, 850.0, 890.0, 930.0, 970.0, 1010.0, 1050.0, 1090.0, 1130.0, 1170.0, 1210.0, 1250.0, 1290.0, 1330.0, 1370.0, 1410.0, 1450.0, 1490.0, 1530.0, 1570.0, 1610.0, 1650.0, 1690.0, 1690.0, 1730.0, 1770.0, 1810.0, 1850.0, 1890.0, 1930.0, 1970.0, 2010.0, 2050.0, 2090.0, 2130.0, 2170.0, 2210.0, 2250.0, 2290.0, 2330.0, 2370.0, 2410.0, 2450.0, 2490.0, 2530.0, 2570.0, 2610.0, 2650.0, 2690.0, 2730.0, 2770.0, 2810.0, 2850.0, 2890.0, 2930.0, 2970.0, 3010.0, 3050.0, 3090.0, 3130.0, 3170.0, 3210.0, 3250.0, 3290.0, 3330.0, 3370.0, 3410.0, 3450.0, 3490.0, 3530.0, 3570.0, 3610.0, 3650.0, 3690.0, 3730.0, 3770.0, 3810.0, 3850.0, 3890.0, 3930.0]
            yValues = [46, 11, 68, 14, 155, 21, 40, 137, 156, 68, 50, 19, 80, 370, 500, 111, 76, 81, 144, 355, 331, 294, 540, 491, 855, 2071, 1741, 929, 369, 1836, 621, 7086, 2000, 5000, 195, 82, 47, 21, 16, 17, 14, 14, 5, 8, 10, 13, 14, 15, 1, 1, 10, 9, 10, 15, 18, 18, 14, 17, 16, 26, 45, 65, 138, 253, 1500, 107, 51, 49, 32, 21, 9, 17, 18, 13, 19, 29, 3, 19, 14, 29, 29, 26, 21, 21, 23, 29, 32, 40, 30]
        } else {
            xValues = [450.0, 490.0, 530.0, 570.0, 610.0, 650.0, 690.0, 730.0, 770.0, 810.0, 850.0, 890.0, 930.0, 970.0, 1010.0, 1050.0, 1090.0, 1130.0, 1170.0, 1210.0, 1250.0, 1290.0, 1330.0, 1370.0, 1410.0, 1450.0, 1490.0, 1530.0, 1570.0, 1610.0, 1650.0, 1690.0, 1730.0, 1770.0, 1810.0, 1850.0, 1890.0, 1930.0, 1970.0, 2010.0, 2050.0, 2090.0, 2130.0, 2170.0, 2210.0, 2250.0, 2290.0, 2330.0, 2370.0, 2410.0, 2450.0, 2490.0, 2530.0, 2570.0, 2610.0, 2650.0, 2690.0, 2730.0, 2770.0, 2810.0, 2850.0, 2890.0, 2930.0, 2970.0, 3010.0, 3050.0, 3090.0, 3130.0, 3170.0, 3210.0, 3250.0, 3290.0, 3330.0, 3370.0, 3410.0, 3450.0, 3490.0, 3530.0, 3570.0, 3610.0, 3650.0, 3690.0, 3730.0, 3770.0, 3810.0, 3850.0, 3890.0, 3930.0]
            yValues = [24.0, 13.0, 39.0, 116.0, 38.0, 67.0, 30.0, 225.0, 23.0, 16.0, 5.0, 3.0, 6.0, 4.0, 16.0, 345.0, 124.0, 137.0, 289.0, 75.0, 49.0, 79.0, 123.0, 42.0, 18.0, 61.0, 54.0, 10.0, 28.0, 42.0, 13.0, 20.0, 122.0, 477.0, 39.0, 9.0, 4.0, 9.0, 5.0, 2.0, 0.0, 1.0, 2.0, 1.0, 1.0, 0.0, 4.0, 11.0, 13.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 5.0, 6.0, 11.0, 22.0, 36.0, 51.0, 27.0, 45.0, 52.0, 10.0, 7.0, 6.0, 6.0, 5.0, 6.0, 7.0, 7.0, 7.0, 11.0, 9.0, 181.0, 10.0, 11.0, 10.0, 11.0, 11.0, 8.0, 12.0, 1.0, 12.0]
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
        graphFlag = 1;

        a22.add({
            update: function (anim) {
                document.getElementById("message").innerHTML = messageArr[7];
            }
        });
    }
}

// Evaluation
function directToEvaluation() {
    if (evalFlag) {
        window.location.href = './html/evaluation.html';
    }
}
