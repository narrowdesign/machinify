
(function(){
  var WIN_W = 1000;
  var WIN_H = 666;

  var R = 330;

  var QUANTITY = 80;

  var canvas;
  var ctx;
  var ctx2;
  var dots;

  var centerX = WIN_W * 0.5;
  var centerY = WIN_H * 0.5;
  var frame = 0;
  var cycle = 0;



  function init() {
    canvas = document.getElementById( 'graphic4' );
    canvas2 = document.getElementById( 'canvas-scratch' );

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx2 = canvas2.getContext('2d');

      createdots();

      windowResizeHandler();

      loop();
    }
  }

  function createdots() {
    dots = [];

    for (var i = 0; i < QUANTITY; i++) {
      var dot;

      dots.push( dot );
    }
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
    if (visible) {
      requestAnimationFrame(function(){
        frame++;
        ctx2.clearRect(0,0,WIN_W,WIN_H);
        ctx2.drawImage(canvas,0,0);

        ctx.clearRect(0,0,WIN_W,WIN_H);
        ctx.globalAlpha = .92;
        ctx.drawImage(canvas2,0,0);
        ctx.globalAlpha = easeOutQuad(1,frame/4);
        for (i = 0, len = dots.length; i < len; i++) {
          ctx.beginPath();
          ctx.moveTo(i*30,WIN_H);
          // ctx.strokeStyle="rgba(157,178,237,.5)"
          ctx.lineWidth = .08;
          ctx.lineTo(i*30,0);
          ctx.stroke();

          var progress = Math.min(1,frame/100);
          var lineTop = easeOutQuad(WIN_H - 120 * progress - (i*i*i)/56 * progress, frame);
          lineTop = Math.max(0,lineTop);
          ctx.beginPath();
          setStrokeColor(i);
          ctx.moveTo(i*30-5,WIN_H);
          ctx.lineWidth = 3;
          ctx.lineTo(i*30-5,lineTop);
          ctx.stroke();
        }
        // if (frame > 504) {
        //   frame = 0;
        //   cycle++;
        // }
        loop();
      })
    }
  }

  function setStrokeColor(num) {
    var r2 = 157;
    var g2 = 178;
    var b2 = 237;

    var r1 = 229;
    var g1 = 44;
    var b1 = 88;

    var r = Math.floor(r1 - (r1-r2) * Math.abs((frame-num)%160-80)/80);
    var g = Math.floor(g1 - (g1-g2) * Math.abs((frame-num)%160-80)/80);
    var b = Math.floor(b1 - (b1-b2) * Math.abs((frame-num)%160-80)/80);

    ctx.strokeStyle='rgba(' + r + ',' + g + ',' + b + ',1)';
  }

  init();

  function easeOutQuad (num, frame) {
    return num * Math.min(1,frame/100) * (2 - Math.min(1,frame/100));
  }

  var visible = false;
  var inview4 = new Waypoint.Inview({
    element: document.querySelector('.graphic4-container'),
    entered: function(direction) {
      if (!visible) {
        visible = true;
        frame = 0;
        loop();
      }
    },
    exited: function(direction) {
      frame = 0;
      visible = false;
      setTimeout(function(){
        ctx.clearRect(0,0,WIN_W,WIN_H);
      },20)
    }
  })


})();
