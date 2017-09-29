(function() {
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
    ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawLines();
  }

  function drawLines() {
    // move the origin to the center
    ctx.translate(centerX,centerY);
    // set the number of branches
    branches = Math.round(Math.random() * 28) + 115;
    branchesPos = [];
    for (var i=0;i<branches;i++) {
      branchesPos[i] = [0,0]
    }
    resetting = false;
    frame = 0;
    cancelAnimationFrame(raf);
    drawTimeout();
  }
  function drawTimeout(){
    // draw branches
    raf = requestAnimationFrame(function(){
      frame++;

      if (frame < 500) {
        for (var i=0;i<branches;i++) {
          ctx.beginPath();
          // move the originX point of the line to currentRing * (radius/rings)
          ctx.moveTo(branchesPos[i][0],branchesPos[i][1]);
          branchesPos[i] = [Math.min(branchesPos[i][0] + Math.random()*8 - i%2 - i%3,233),Math.min(branchesPos[i][1] + Math.random()*8 - i%2 - i%3,233)]
          ctx.lineTo(branchesPos[i][0],branchesPos[i][1]);
          ctx.rotate((i/branches)*Math.PI*2)

          setStrokeColor(i);
          ctx.lineWidth = .5;
          ctx.stroke();
        }

      } else if (!resetting) {
        resetting = true;
        setTimeout(function(){
          resetLines();
        },2000)
      }

      drawTimeout();
    })
  }

  function setStrokeColor(num) {
    num%2 ? ctx.strokeStyle="#9DB2ED" : ctx.strokeStyle="#E52C58";
  }

  function resetLines() {
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawLines();
  }

  window.addEventListener('scroll',function(e){
    if (scrollY > document.getElementById("graphic1").getBoundingClientRect().top - window.innerHeight && !inited) {
      init();
    }
  })

})();
