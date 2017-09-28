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
  var timeout = 0;
  var totalRadians = 0;
  var rings = 0;
  var ringSections = new Array();
  var currentRing = 0;
  var currentSection = 0;
  var frame = 0;

  var resetting = false;

  var inited = false;

  function init(){
    inited = true;
    canvas = document.getElementById("graphic1");
    ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawLines();
  }

  function drawLines() {
    // move the origin to the center
    ctx.translate(centerX,centerY);
    // set the number of rings
    rings = Math.round(Math.random() * 5) + 2;
    // clear the number of sections
    ringSections = [];
    // set the number of sections per ring between 6-20
    for (var i=0;i<rings;i++) {
      ringSections[i] = Math.round(Math.random() * 80) + 5;
      drawCircle(i)
    }
    currentRing = 0;
    currentSection = 0;
    resetting = false;
    cancelAnimationFrame(raf);
    drawTimeout();
  }
  function drawTimeout(){
    // draw a section line
    raf = requestAnimationFrame(function(){
      frame++;
      canvas.style.transform = 'rotate(' + -frame + 'deg)'

      if (currentRing < rings) {
        ctx.beginPath();
        // move the originX point of the line to currentRing * (radius/rings)
        var originX = currentRing * radius/rings;
        ctx.moveTo(originX,0);
        // draw a line the width of the ring
        var segmentW = radius/rings;
        ctx.lineTo(originX + segmentW,0);
        // rotate the line 360/ringSections[currentRing] * currentSection
        var segmentR = 360/ringSections[currentRing];
        var rotation = segmentR*currentSection*Math.PI/180;

        console.log('ring:',currentRing,'section:',currentSection,'rotation:',rotation)

        setStrokeColor(currentRing);
        ctx.lineWidth = .8;
        ctx.resetTransform();
        ctx.translate(centerX,centerY);
        ctx.stroke();
        ctx.rotate(rotation);
        currentSection++;
        drawCircle()
      } else if (!resetting) {
        resetting = true;
        setTimeout(function(){
          resetLines();
        },2000)
      }

      if (currentSection > ringSections[currentRing]) {
        currentRing++;
        currentSection = 0;
      }

      drawTimeout();
    })
  }

  function drawCircle(num) {
    ctx.beginPath();
    ctx.arc(0, 0, (radius/rings) * (num+1), 0, 2 * Math.PI, false);
    setStrokeColor(num);
    ctx.lineWidth = .4;
    ctx.stroke();
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
