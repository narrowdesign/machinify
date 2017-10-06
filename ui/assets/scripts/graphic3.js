// One of my first <canvas> experiments, woop! :D

(function(){
  var WIN_W = 1000;
  var WIN_H = 666;

  var R = 328;

  var QUANTITY = 155;

  var canvas;
  var context;
  var dots;

  var centerX = WIN_W * 0.5;
  var mouseX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;
  var mouseY = WIN_W * 0.5;

  var frame = 0;

  function init() {

    canvas = document.getElementById( 'graphic3' );
    canvas2 = document.getElementById( 'canvas-scratch');

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx2 = canvas2.getContext('2d');

      // Register event listeners
      window.addEventListener('mousemove', documentMouseMoveHandler, false);
      window.addEventListener('resize', windowResizeHandler, false);

      createdots();

      windowResizeHandler();

      setInterval( loop, 1000 / 60 );
    }
  }

  function createdots() {
    dots = [];

    for (var i = 0; i < QUANTITY; i++) {
      var dot = {
        size: 1,
        position: { x: centerX, y: centerY },
        offset: { x: 0, y: 0 },
        shift: { x: centerX, y: centerY },
        speed: 0.01+Math.random()*0.04,
        targetSize: 1,
        fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
        orbit: R*.5 + (R * .5 * Math.random())
      };

      dots.push( dot );
    }
  }

  function documentMouseMoveHandler(event) {
    mouseX = event.clientX-500 - (1000 - WIN_W) * .5;
    mouseY = event.clientY-500 - (1000 - WIN_H) * .5;
  }


  function windowResizeHandler() {
    WIN_W = 1000;
    WIN_H = 666;

    canvas.width = 1000;
    canvas.height = 666;
    canvas2.width = 1000;
    canvas2.height = 666;
  }

  function loop() {

    frame++

    ctx2.clearRect(0,0,WIN_W,WIN_H);
    ctx2.drawImage(canvas,0,0);

    ctx.clearRect(0,0,WIN_W,WIN_H);
    ctx.globalAlpha = .97;
    ctx.drawImage(canvas2,0,0);

    ctx.globalAlpha = 1;
    for (i = 0, len = dots.length; i < len; i++) {
      var dot = dots[i];

      var linePos = { x: dot.position.x, y: dot.position.y };

      dot.offset.x += ((mouseX/WIN_W + mouseY/WIN_H)/2-.5)*2 * dot.speed + .01;
      dot.offset.y += ((mouseX/WIN_W + mouseY/WIN_H)/2-.5)*2 * dot.speed + .01;
      dot.position.x = centerX + Math.cos(i + dot.offset.x) * (dot.orbit);
      dot.position.y = centerY + Math.sin(i + dot.offset.y) * (dot.orbit);

      dot.position.x = Math.max( Math.min( dot.position.x, WIN_W ), 0 );
      dot.position.y = Math.max( Math.min( dot.position.y, WIN_H ), 0 );

      dot.size += ( dot.targetSize - dot.size ) * 0.05;

      if( Math.round( dot.size ) == Math.round( dot.targetSize ) ) {
        dot.targetSize = 1 + Math.random() * 3;
      }

      ctx.beginPath();
      ctx.fillStyle = setFillColor(i);
      ctx.lineWidth = dot.size;
      ctx.moveTo(linePos.x, linePos.y);
      ctx.lineTo(dot.position.x, dot.position.y);
      ctx.arc(dot.position.x, dot.position.y, dot.size/2, 0, Math.PI*2, true);
      if (frame > 1) {
        ctx.fill();
      }
    }
  }

  function setFillColor(num) {
    num%2 ? ctx.fillStyle="#9DB2ED" : ctx.fillStyle="#E52C58";
  }

  window.onload = init;

}())
