// One of my first <canvas> experiments, woop! :D

(function(){
  var WIN_W = 1000;
  var WIN_H = 666;

  var R = 328;

  var QUANTITY = 6;

  var canvas;
  var ctx;
  var dots;

  var mouseX = WIN_W * 0.5;
  var mouseY = WIN_H * 0.5;
  var mouseIsDown = false;

  function init() {
    canvas = document.getElementById( 'graphic4' );

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');

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
        position: { x: mouseX, y: mouseY },
        offset: { x: 0, y: 0 },
        shift: { x: mouseX, y: mouseY },
        speed: 0.01+Math.random()*0.04,
        targetSize: 14,
        fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
        orbit: R*.5 + (R * .5 * i/10)
      };

      dots.push( dot );
    }
  }

  function windowResizeHandler() {
    WIN_W = 1000;
    WIN_H = 666;

    canvas.width = 1000;
    canvas.height = 666;
  }

  function loop() {

    ctx.globalAlpha = .97;

    ctx.globalAlpha = 1;
    for (i = 0, len = dots.length; i < len; i++) {
      var dot = dots[i];

      var linePos = { x: dot.position.x, y: dot.position.y };

      dot.offset.x += ((mouseX/WIN_W + mouseY/WIN_H)/2-.5)*2 * dot.speed + .01;
      dot.offset.y += ((mouseX/WIN_W + mouseY/WIN_H)/2-.5)*2 * dot.speed + .01;
      dot.shift.x += 0;
      dot.shift.y += 0;
      dot.position.x = dot.shift.x + Math.cos(i + dot.offset.x) * (dot.orbit);
      dot.position.y = dot.shift.y + Math.sin(i + dot.offset.y) * (dot.orbit);

      dot.position.x = Math.max( Math.min( dot.position.x, WIN_W ), 0 );
      dot.position.y = Math.max( Math.min( dot.position.y, WIN_H ), 0 );

      dot.size = 3;

      if( Math.round( dot.size ) == Math.round( dot.targetSize ) ) {
        dot.targetSize = 1 + Math.random() * 3;
      }

      ctx.beginPath();
      ctx.fillStyle = setFillColor(i);
      ctx.lineWidth = dot.size;
      ctx.moveTo(linePos.x, linePos.y);
      ctx.lineTo(dot.position.x, dot.position.y);
      ctx.arc(dot.position.x, dot.position.y, dot.size/2, 0, Math.PI*2, true);
      ctx.fill();
    }
  }

  function setFillColor(num) {
    num%3 ? ctx.fillStyle="#9DB2ED" : ctx.fillStyle="#E52C58";
  }

  init();

}())
