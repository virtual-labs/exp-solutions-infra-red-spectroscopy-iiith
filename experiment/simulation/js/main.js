"use strict";
let overallIteration = -4;
let divWidth;
let videoSpeed = 1;
let speedFactor = 1.0;
let purple = "#b83dba";
let blue = "#00a8f3";

const apparatusOptions = [
  "sample",
  "solvent",
  "solution",
  "device-dessicator",
  "device-jrcell",
  "observe",
];

apparatusOptions.forEach(function (option) {
  document.getElementById(option).style.pointerEvents = "none";
});

document.getElementById("sample").style.pointerEvents = "auto";

let fillSyringe = async () => {
  if (overallIteration === 4) {
    document.getElementById("line3").style.stopColor = "orange";
    const line = document.getElementById("half-grad3");
    const yFinalPosition = 0;
    let yPos = 100;
    const interval = window.setInterval(() => {
      if (yPos < yFinalPosition) {
        line.setAttribute("y1", "0.1%");
        return window.clearInterval(interval);
      }
      yPos -= 0.6;
      line.setAttribute("y1", `${yPos}%`);
    }, 1);
    overallIteration++;
    if (overallIteration === 2) {
      document.getElementById("solvent-beaker").style.cursor = "pointer";
      document.getElementById("sample-beaker").style.cursor = "default";
    } else if (overallIteration === 5) {
      document.getElementById("solution-beaker").style.cursor = "default";
    }
  }
};

let emptySyringe = async () => {
  document.getElementById("line3").style.stopColor = "white";
  const line = document.getElementById("half-grad3");
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);

  // Filling the Jr cell slit
  let path = document.getElementById("fill-slit");
  let final = 1;
  let cur = 0;
  while (true) {
    if (cur > final) {
      break;
    }
    cur += 0.01;
    path.setAttribute("offset", cur);
    await new Promise((resolve) => setTimeout(resolve, 2));
  }

  document.getElementById("jrcell").style.cursor = "pointer";
};

async function moveJrCell(x) {
  let image = document.getElementById("jrcell");
  image.setAttribute("opacity", "1");
  let a1 = anime.timeline({
    targets: "#jrcell",
    duration: 800,
    easing: "linear",
  });
  if (x === 0 && overallIteration === 6) {
    a1.add({
      duration: 1000,
      translateY: -300,
      scale: 0.25,
    }).add({
      opacity: 0,
    });

    document.getElementById("observe").style.pointerEvents = "auto";
    //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
    document.getElementById("instruction").innerHTML =
      "Click on Observe button to observe what is happening inside the desiccator and choose video speed according to your own liking.";
    //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
    document.getElementById("observation").innerHTML =
      "Click on Observe button to observe what is happening inside the desiccator and choose video speed according to your own liking.";
  } else if (x === 1) {
    let a1 = anime.timeline({
      targets: "#jrcell",
      duration: 800,
      easing: "linear",
    });
    a1.add({
      duration: 1000,
      translateY: 0,
      scale: 1,
    });
  }
}

let fillPipette = async () => {
  const line = document.getElementById("half-grad2");
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
};

function pur() {
  if (overallIteration === 1) {
    changeMessage();
    let image = document.getElementById("spoon1");
    image.setAttribute("opacity", "1");
    image.style.transform = "translate(200%, -5%);";
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#spoon1",
      duration: 800,
      easing: "linear",
    });
    a1.add({
      duration: 0,
      translateX: "280%",
      translateY: "-125%",
    })
      .add({
        duration: 800,
        translateY: "-55%",
      })
      .add({
        translateY: "-125%",
        update: function (anim) {
          document.getElementById("spoon-mouth").style.fill = purple;
          document.getElementById("spoon-mouth").style.opacity = "1";
        },
      })
      .add({
        duration: 800,
        translateX: "500%",
        translateY: "175%",
      })
      .add({
        delay: "800",
        rotateZ: "45",
      })
      .add({
        update: function (anim) {
          document.getElementById("spoon-mouth").style.fill = purple;
          document.getElementById("spoon-mouth").style.opacity = "0";
          document.getElementById("pink-bottom").style.fill = purple;
        },
        opacity: 0,
      });
    document
      .getElementById("solvent-beaker")
      .setAttribute("onclick", "movePipette()");
    overallIteration++;
    document.getElementById("sample-beaker").style.cursor = "default";
    document.getElementById("solvent-beaker").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function liftPiston() {
  let image = document.getElementById("syringe-piston");
  image.style.transform = "translate(100%, -5%);";
  image.style.pointerEvents = "none";
  let a1 = anime.timeline({
    targets: "#syringe-piston",
    duration: 800,
    easing: "linear",
  });
  a1.add({
    duration: 0,
    translateY: "8%",
  }).add({
    duration: 800,
    translateY: "-3%",
  });
}

async function movePipette() {
  if (overallIteration === 2) {
    changeMessage();
    let image = document.getElementById("pipette");
    image.setAttribute("opacity", "1");
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#pipette",
      duration: 800,
      easing: "linear",
    });
    let startX = "-980%";
    let startY = "150%";

    screenWidth();

    if (divWidth > 1759) {
      startY = "-150%";
      startX = "450%";
    }

    if (divWidth < 769) {
      startY = "120%";
      startX = "-980%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
    });
    fillPipette();
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 500,
      translateX: "-110%",
    })
      .add({
        duration: 800,
        translateY: "170%",
      })
      .add({
        update: function (anim) {
          document.getElementById("layer-above-pink").style.fill = blue;
        },
        opacity: 0,
      });
    document
      .getElementById("solution-beaker")
      .setAttribute("onclick", "shakeBeaker()");
    overallIteration++;
    document.getElementById("solvent-beaker").style.cursor = "default";
    document.getElementById("solution-beaker").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function shakeBeaker() {
  if (overallIteration === 3) {
    changeMessage();
    let image = document.getElementById("solution-beaker");
    let a1 = anime
      .timeline({
        targets: "#solution-beaker",
        duration: 800,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: 0,
      })
      .add({
        duration: 0,
        translateX: "0%",
      })
      .add({
        rotate: [10, 0, -10, 0],
      })
      .add({
        update: function (anim) {
          document.getElementById("layer-above-pink").style.fill = "orange";
          document.getElementById("pink-bottom").style.fill = "orange";
        },
      });
    document
      .getElementById("solution-beaker")
      .setAttribute("onclick", "moveSyringe()");
    overallIteration++;

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function moveSyringe() {
  if (overallIteration === 4) {
    let image = document.getElementById("syringe");
    image.style.opacity = 1;
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#syringe",
      duration: 800,
      easing: "linear",
    });

    let startX = "-1040%";
    let startY = "-410%";
    let endX = "240%";
    let endY = "-245%";

    screenWidth();

    if (divWidth > 1759) {
      startX = "-1300%";
      startY = "-370%";
      endX = "150%";
      endY = "-135%";
    }

    if (divWidth < 769) {
      startX = "260%";
      startY = "-1550%";
      endX = "120%";
      endY = "-280%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
      rotateZ: 0,
    });
    liftPiston();
    fillSyringe();
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 100,
      rotateZ: 90,
    }).add({
      duration: 1000,
      translateY: endY,
      translateX: endX,
    });
    await new Promise((r) => setTimeout(r, 1300));
    emptySyringe();
    await new Promise((r) => setTimeout(r, 1300));
    document.getElementById("syringe").style.opacity = 0;
    changeMessage();
    overallIteration++;

    if (restartAnimation) {
      a1.restart();
    }

    restartAnimation = false;
  }
}

let setupMessages = [
  "Click on the Sample Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Solvent Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Solution Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Desiccator option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the JR Cell option in the Apparatus Menu to remove it from the Desiccator and introduce it into the workspace.",
];

let setup = 0;

function setupMessage() {
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = setupMessages[setup];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = setupMessages[setup];
  setup++;
}

function apparatusSetup(visibleID, oldOption, newOption) {
  document.getElementById(visibleID).style.visibility = "visible";
  document.getElementById(oldOption).style.pointerEvents = "none";
  document.getElementById(newOption).style.pointerEvents = "auto";
}

setupMessage();
async function visibility(x) {
  if (x === 1 && overallIteration === -4) {
    apparatusSetup("sample-beaker", "sample", "solvent");
    overallIteration++;
    setupMessage();
  } else if (x === 2 && overallIteration === -3) {
    apparatusSetup("solvent-beaker", "solvent", "solution");
    overallIteration++;
    setupMessage();
  } else if (x === 3 && overallIteration === -2) {
    apparatusSetup("solution-beaker", "solution", "device-dessicator");
    overallIteration++;
    setupMessage();
  } else if (x === 4 && overallIteration === -1) {
    apparatusSetup("desiccator-row", "device-dessicator", "device-jrcell");
    overallIteration++;
    setupMessage();
  } else if (x === 5 && overallIteration === 0) {
    apparatusSetup("jrcell-row", "device-jrcell", "restart");
    document.getElementById("sample-beaker").style.cursor = "pointer";
    overallIteration++;
    changeMessage();
  }
}

let instructionMessages = [
  "Click on the Sample Beaker to transfer small amount (around 1mg) of the Sample substance into the empty Solution Beaker",
  "Click on the Solvent Beaker to transfer 5 ml of the Solvent (methanol) to the Solution Beaker.",
  "Click on the  Solution Beaker to shake it and make a clear solution.",
  "Click on the Solution Beaker to draw 1 ml of the solution prepared to load on to the slit of the JR Cell.",
  "Click on the JR Cell to put it back into the Desiccator.",
];
let iter1 = -1;
function changeMessage() {
  iter1++;
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = instructionMessages[iter1];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = instructionMessages[iter1];
}

let iter2 = -1;
let observationMessages = [
  "Now observe the zoomed in animation of the Desiccator. The ray goes from the IR Source to the Beam Splitter, from where it further proceeds to the Fixed and Movable Mirrors. The reflected rays are merged at the Beam Splitter and proceed towards the Detector for detection.",
  "The points on the graph are used to depict the Intensity of the ray detected.",
];

function observeMessage() {
  if (restartAnimation) {
    return;
  }
  iter2++;

  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = observationMessages[iter2];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = observationMessages[iter2];
}

function screenWidth() {
  divWidth = document.getElementById("workspace").clientWidth;
}

let originalSimulationHeight =
  document.getElementById("simulation").clientHeight;

document.getElementById("simulation").style.minHeight =
  originalSimulationHeight + "px";

let restartAnimation = false;

async function restart() {
  moveJrCell(1);
  document.getElementById("simulation").style.height = originalSimulationHeight;

  document.getElementById("animation-video").style.display = "none";
  document.getElementById("plotted-graph-window").style.display = "none";

  //"head-instructions" is the Heading of the Instructions HTML element that will be visible only in wide screens, i.e., width greater than 768px
  document.getElementById("head-instructions").innerHTML = "Instructions";
  //"head-observations" is the Heading of the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("head-observations").innerHTML = "Instructions";
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = "";
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = "";
  apparatusOptions.forEach(function (option) {
    document.getElementById(option).style.pointerEvents = "none";
  });
  document.getElementById("sample").style.pointerEvents = "auto";

  overallIteration = -4;
  iter2 = -1;
  iter1 = -1;
  setup = 0;
  setupMessage();
  document.getElementById("syringe").style.opacity = 0;
  document.getElementById("apparatus-bottles").style.display = "block";
  document.getElementById("apparatus-desiccator").style.display = "block";
  document.getElementById("sample-beaker").style.visibility = "hidden";
  document.getElementById("solvent-beaker").style.visibility = "hidden";
  document.getElementById("solution-beaker").style.visibility = "hidden";
  document.getElementById("desiccator-row").style.visibility = "hidden";
  document.getElementById("jrcell-row").style.visibility = "hidden";
  document.getElementById("slidecontainer").style.display = "none";
  restartAnimation = true;

  document.getElementById("solvent-beaker").style.cursor = "default";
  document.getElementById("sample-beaker").style.cursor = "pointer";
  document.getElementById("solution-beaker").style.cursor = "default";

  // Resetting the Solution Beaker
  document.getElementById("pink-bottom").style.fill = "none";
  document.getElementById("layer-above-pink").style.fill = "none";

  //Resetting the JR Cell
  let path = document.getElementById("fill-slit");
  path.setAttribute("offset", "0%");
  document.getElementById("jrcell").style.cursor = "default";
  document.getElementById("jrcell").setAttribute("opacity", "1");
}

async function observe() {
  if (overallIteration === 6) {
    document.getElementById("observe").style.pointerEvents = "none";
    document.getElementById("slidecontainer").style.display = "block";
    document.getElementById("apparatus-bottles").style.display = "none";
    document.getElementById("apparatus-desiccator").style.display = "none";
    document.getElementById("animation-video").style.display = "block";
    document.getElementById("animation-bottom-right").play();

    //"head-instructions" is the Heading of the Instructions HTML element that will be visible only in wide screens, i.e., width greater than 768px
    document.getElementById("head-instructions").innerHTML = "Observations";
    //"head-observations" is the Heading of the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
    document.getElementById("head-observations").innerHTML = "Observations";
    //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
    document.getElementById("observation").innerHTML = "";
    //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
    document.getElementById("instruction").innerHTML = "";

    observeMessage();

    await new Promise((r) => setTimeout(r, 8000 * speedFactor));

    if (!restartAnimation) {
      overallIteration++;

      document.getElementById("observe").style.pointerEvents = "auto";
      //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
      document.getElementById("instruction").innerHTML =
        "Click on Observe option in the Control Menu again to see the graph.";
      //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
      document.getElementById("observation").innerHTML =
        "Click on Observe option in the Control Menu again to see the graph.";
    }
  } else if (overallIteration === 7) {
    observeMessage();

    document.getElementById("observe").style.pointerEvents = "none";
    document.getElementById("slidecontainer").style.display = "none";

    document.getElementById("animation-video").style.display = "none";
    document.getElementById("plotted-graph-window").style.display = "block";
    createGraph();

    overallIteration++;
    setTimeout(function () {
      //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
      document.getElementById("instruction").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
      //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
      document.getElementById("observation").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
    }, 10000);
  }
}

let sample = document.getElementById("sample-beaker");
sample.addEventListener("click", function () {
  pur();
});

let jrcell = document.getElementById("jrcell");
jrcell.addEventListener("click", function () {
  moveJrCell(0);
});

let slider = document.getElementById("slider");
let vid = document.getElementById("animation-bottom-right");
slider.oninput = function () {
  videoSpeed = slider.value;
  vid.playbackRate = videoSpeed;
  speedFactor = 1 / videoSpeed;
};

function createGraph() {
  let trace1 = {
    x: [
      450.0, 490.0, 530.0, 570.0, 610.0, 650.0, 690.0, 730.0, 770.0, 810.0,
      850.0, 890.0, 930.0, 970.0, 1010.0, 1050.0, 1090.0, 1130.0, 1170.0,
      1210.0, 1250.0, 1290.0, 1330.0, 1370.0, 1410.0, 1450.0, 1490.0, 1530.0,
      1570.0, 1610.0, 1650.0, 1690.0, 1690.0, 1730.0, 1770.0, 1810.0, 1850.0,
      1890.0, 1930.0, 1970.0, 2010.0, 2050.0, 2090.0, 2130.0, 2170.0, 2210.0,
      2250.0, 2290.0, 2330.0, 2370.0, 2410.0, 2450.0, 2490.0, 2530.0, 2570.0,
      2610.0, 2650.0, 2690.0, 2730.0, 2770.0, 2810.0, 2850.0, 2890.0, 2930.0,
      2970.0, 3010.0, 3050.0, 3090.0, 3130.0, 3170.0, 3210.0, 3250.0, 3290.0,
      3330.0, 3370.0, 3410.0, 3450.0, 3490.0, 3530.0, 3570.0, 3610.0, 3650.0,
      3690.0, 3730.0, 3770.0, 3810.0, 3850.0, 3890.0, 3930.0,
    ],
    y: [
      46, 11, 68, 14, 155, 21, 40, 137, 156, 68, 50, 19, 80, 370, 500, 111, 76,
      81, 144, 355, 331, 294, 540, 491, 855, 2071, 1741, 929, 369, 1836, 621,
      7086, 2000, 5000, 195, 82, 47, 21, 16, 17, 14, 14, 5, 8, 10, 13, 14, 15,
      1, 1, 10, 9, 10, 15, 18, 18, 14, 17, 16, 26, 45, 65, 138, 253, 1500, 107,
      51, 49, 32, 21, 9, 17, 18, 13, 19, 29, 3, 19, 14, 29, 29, 26, 21, 21, 23,
      29, 32, 40, 30,
    ],
    mode: "lines",
    line: {
      color: "rgb(232, 217, 79)",
      width: 3,
    },
  };

  let data = [trace1];

  let layout = {
    showlegend: false,
    autosize: true,
    annotations: [
      {
        xref: "paper",
        yref: "paper",
        x: 0.4,
        y: 1.0,
        xanchor: "left",
        yanchor: "bottom",
        text: "Intensity",
        font: {
          family: "Arial",
          size: 30,
          color: "rgb(0,0,0)",
        },
        showarrow: false,
      },
    ],
  };

  let config = { responsive: true };
  Plotly.newPlot("chart-container", data, layout, config);
}
