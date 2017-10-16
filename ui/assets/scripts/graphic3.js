(function(){
  var visible = false;
  var WIN_W = 1000;
  var WIN_H = 666;

  var loopInterval;

  var R = 328;

  var QUANTITY = 155;

  var canvas;
  var ctx;
  var ctx2;
  var comets;

  var centerX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;

  var frame = 0;

  function init() {

    canvas = document.getElementById( 'graphic3' );
    canvas2 = document.getElementById( 'canvas-scratch');

    canvas.width = 1000;
    canvas.height = 666;
    canvas2.width = 1000;
    canvas2.height = 666;

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx2 = canvas2.getContext('2d');

      createcomets();
    }

    var inview3 = new Waypoint.Inview({
      element: document.querySelector('.graphic3-container'),
      entered: function(direction) {
        if (!visible) {
          visible = true;
          frame = 0;
          loopInterval = setInterval( loop, 1000 / 60 );
        }
      },
      exited: function(direction) {
        frame = 0;
        clearInterval(loopInterval);
        visible = false;
        ctx.clearRect(0,0,WIN_W,WIN_H)
      }
    })
  }

  function createcomets() {
    comets = [];

    for (var i = 0; i < QUANTITY; i++) {
      var comet = {
        position: { x: centerX, y: centerY },
        offset: { x: 0, y: 0 },
        radius: R*.5 + (R * .5 * Math.random()),
        speed: 0.005+Math.random()*0.001,
        size: 1,
        randomSize: 1,
      };

      comets.push( comet );
    }
  }

  function loop() {

    if (visible) {
      frame++;

      ctx2.clearRect(0,0,WIN_W,WIN_H);
      ctx2.drawImage(canvas,0,0);

      ctx.clearRect(0,0,WIN_W,WIN_H);
      ctx.globalAlpha = .97;
      ctx.drawImage(canvas2,0,0);

      ctx.globalAlpha = 1;
      for (i = 0, len = comets.length; i < len; i++) {
        var comet = comets[i];

        var linePos = { x: comet.position.x, y: comet.position.y };

        comet.offset.x += comet.speed;
        comet.offset.y += comet.speed;
        comet.position.x = centerX + Math.cos(i + comet.offset.x) * (comet.radius);
        comet.position.y = centerY + Math.sin(i + comet.offset.y) * (comet.radius);

        comet.position.x = Math.max( Math.min( comet.position.x, WIN_W ), 0 );
        comet.position.y = Math.max( Math.min( comet.position.y, WIN_H ), 0 );

        comet.size += ( comet.randomSize - comet.size ) * 0.05;

        if( Math.round( comet.size ) == Math.round( comet.randomSize ) ) {
          comet.randomSize = .2 + Math.random() * 6;
        }

        ctx.beginPath();
        ctx.fillStyle = setFillColor(i);
        ctx.lineWidth = comet.size;
        ctx.moveTo(linePos.x, linePos.y);
        ctx.lineTo(comet.position.x, comet.position.y);
        ctx.arc(comet.position.x, comet.position.y, comet.size/2, 0, Math.PI*2, true);
        if (frame > 1) {
          ctx.fill();
        }
      }
    }
  }

  function setFillColor(num) {
    num%2 ? ctx.fillStyle="#9DB2ED" : ctx.fillStyle="#E52C58";
  }

  window.onload = init;


}())
