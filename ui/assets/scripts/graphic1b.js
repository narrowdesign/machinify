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
  var numRings = 0;
  var rings = new Array();
  var numRingSections = new Array();
  var currentRing = 0;
  var currentSection = 0;
  var frame = 0;
  var sections = new Array();

  var resetting = false;

  var inited = false;

  function init(){
    inited = true;
    canvas = document.getElementById("graphic1");
    canvas.addEventListener('click',function(){
      resetting = true;
      resetLines();
    })
    ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawLines();
  }

  function drawLines() {
    // move the origin to the center
    ctx.translate(centerX,centerY);
    // set the number of rings
    numRings = Math.round(Math.random() * 5) + 2;
    // clear the number of sections
    numRingSections = [];
    // set the number of sections per ring between 6-20
    for (var i=0;i<numRings;i++) {
      numRingSections[i] = Math.round(Math.random() * 80) + 5;
    }
    currentRing = 0;
    currentSection = 0;
    resetting = false;
    cancelAnimationFrame(raf);
    shuffleSections();
    drawTimeout();
  }
  function drawTimeout(){
    // draw a section line
    raf = requestAnimationFrame(function(){
      frame++;
      canvas.style.transform = 'rotate(' + frame/8 + 'deg)'
      resetLines();
      ctx.globalAlpha = 0;
      for (var i=Math.max(0,sections.length-Math.floor(frame*4));i<sections.length;i++) {
        var currentSection = i;
        // if (currentSection < sections.length) {
          var section = sections[currentSection];
          var ring = sections[currentSection][0];
          var myRandom = sections[currentSection][2];
          ctx.beginPath();
          // move the originX point of the line to currentRing * (radius/rings)
          var originX = Math.min(1,(frame/200)) * ring * radius / numRings;
          ctx.moveTo(originX * Math.min(frame/200,1) ,0);
          // draw a line the width of the ring
          var segmentW = (radius / numRings);
          ctx.lineTo(myRandom * -1 * Math.min(0,(-200 + frame)) + originX + segmentW,0);
          // rotate the line 360/numRingSections[currentRing] * currentSection
          var segmentR = 360 / numRingSections[ring] + myRandom * Math.min(0,(-200 + frame))/200;
          var rotation = segmentR * section[1] * Math.PI / 180;

          setStrokeColor(ring);
          ctx.lineWidth = .7 + (1600/window.innerWidth)/5;
          ctx.resetTransform();
          ctx.translate(centerX,centerY);
          ctx.stroke();
          ctx.rotate(rotation);
          ctx.globalAlpha = Math.min(1,.1 + frame/80);
      }
      if (frame > 500) {
        frame = 0;
        resetLines()
        drawLines()
      }

      for (var i=0;i<numRings;i++) {
        drawCircle(i)
      }
      drawTimeout();
    })
  }

  function shuffleSections() {
    sections = [];
    for (var i=0;i <= numRingSections.length; i++) {
      for (var k=0;k <= numRingSections[i]; k++) {
        sections.push([i,k,Math.random()])
      }
    }
    sectionsMess = new Array(sections);
    // sectionsMess[3] = [2,0];
    // for(var j, x, i = sections.length; i; j = parseInt(Math.random() * i), x = sections[--i], sections[i] = sections[j], sections[j] = x);
  };

  function randomSection(section) {
    return sectionOrder[section]
  }

  function drawCircle(num) {
    ctx.beginPath();
    ctx.arc(0, 0, (radius*Math.min(1,(frame/200)) / numRings) * (num + 1), 0, 2 * Math.PI, false);
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
  }

  init();

})();
