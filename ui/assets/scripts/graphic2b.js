(function(){

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var raf;

  var canvas;
  var ctx;
  var canvasWidth = 1000;
  var canvasHeight = 666;
  var centerX = canvasWidth / 2;
  var centerY = canvasHeight / 2;

  var radius = canvasHeight / 2.05;
  var branches = 0;
  var branchesPos = new Array();
  var frame = 0;

  var resetting = false;

  var inited = false;

  function init(){
    inited = true;
    canvas = document.getElementById("graphic2");
    canvas.addEventListener('click',function(){
      resetting = true;
      resetLines();
    })
    ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  function drawLines() {
    // move the origin to the center
    ctx.translate(centerX,centerY);
    // set the number of branches
    branches = 51;
    branchesPos = [];
    for (var i=0;i<branches+500;i++) {
      branchesPos[i] = [0,0]
    }
    resetting = false;
    frame = 0;
    cancelAnimationFrame(raf);
    drawTimeout();
  }
  var delayTimeout;
  function drawTimeout(){
    // draw branches
    if (visible) {
      clearTimeout(delayTimeout)
      raf = requestAnimationFrame(function(){
        frame++;
        canvas.style.transform = 'rotate(' + frame/12 + 'deg)'
        if (frame < 170) {
          for (var i=0;i<branches;i++) {
            ctx.beginPath();
            // move the originX point of the line to currentRing * (radius/rings)
            ctx.moveTo(branchesPos[i][0],branchesPos[i][1]);
            var shiftX = Math.random()*14 - i%2 - i%3;
            var shiftY = (Math.random()*14 - i%2 - i%3);
            var rotation = (i/branches)*Math.PI*2;
            branchesPos[i] = [branchesPos[i][0] + shiftX, branchesPos[i][1] + shiftY]
            ctx.lineTo(branchesPos[i][0],branchesPos[i][1]);
            ctx.rotate(rotation)

            setStrokeColor(i);
            ctx.lineWidth = .5;
            if (branchesPos[i][0] < 233 && branchesPos[i][1] < 233) {
              ctx.stroke();
            }

            if (frame > 20) {
              ctx.beginPath();
              ctx.arc(Math.min(330,Math.floor(((frame-20)/300)*23)*30), 0, 2, 0, Math.PI*2, false);
              setFillColor(i);
              ctx.lineWidth = .06;
              ctx.globalAlpha = .1;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          }
          if (frame%20 == 0) {
            branches += 30
            branches = Math.min(500,branches);
          }
        }
        // } else if (!resetting) {
        //   resetting = true;
        //   setTimeout(function(){
        //     resetLines();
        //   },2000)
        // }

        delayTimeout = setTimeout(drawTimeout,10)
      })
    }
  }

  function setStrokeColor(num) {
    num%2 ? ctx.strokeStyle="#9DB2ED" : ctx.strokeStyle="#E52C58";
  }

  function setFillColor(num) {
    num%3 ? ctx.fillStyle="#9DB2ED" : ctx.fillStyle="#E52C58";
  }

  function resetLines() {
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  init();

  var visible = false;
  var inview2 = new Waypoint.Inview({
    element: document.querySelector('.graphic2-container'),
    entered: function(direction) {
      if (!visible) {
        visible = true;
        frame = 0;
        drawLines();
      }
    },
    exited: function(direction) {
      frame = 0;
      resetLines();
      visible = false;
    }
  })

})();
