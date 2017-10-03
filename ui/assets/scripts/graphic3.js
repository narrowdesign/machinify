// One of my first <canvas> experiments, woop! :D

(function(){
  var SCREEN_WIDTH = 1000;
  var SCREEN_HEIGHT = 666;

  var RADIUS = 320;

  var RADIUS_SCALE = 1;
  var RADIUS_SCALE_MIN = 1;
  var RADIUS_SCALE_MAX = 1.5;

  var QUANTITY = 55;

  var canvas;
  var context;
  var particles;

  var mouseX = SCREEN_WIDTH * 0.5;
  var mouseY = SCREEN_HEIGHT * 0.5;
  var mouseIsDown = false;

  function init() {

    canvas = document.getElementById( 'graphic3' );
    canvas2 = document.getElementById( 'canvas-scratch');

    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');
      context2 = canvas2.getContext('2d');

      // Register event listeners
      window.addEventListener('mousemove', documentMouseMoveHandler, false);
      window.addEventListener('mousedown', documentMouseDownHandler, false);
      window.addEventListener('mouseup', documentMouseUpHandler, false);
      document.addEventListener('touchstart', documentTouchStartHandler, false);
      document.addEventListener('touchmove', documentTouchMoveHandler, false);
      window.addEventListener('resize', windowResizeHandler, false);

      createParticles();

      windowResizeHandler();

      setInterval( loop, 1000 / 60 );
    }
  }

  function createParticles() {
    particles = [];

    for (var i = 0; i < QUANTITY; i++) {
      var particle = {
        size: 1,
        position: { x: mouseX, y: mouseY },
        offset: { x: 0, y: 0 },
        shift: { x: mouseX, y: mouseY },
        speed: 0.01+Math.random()*0.04,
        targetSize: 1,
        fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
        orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
      };

      particles.push( particle );
    }
  }

  function documentMouseMoveHandler(event) {
    mouseX = event.clientX - (1000 - SCREEN_WIDTH) * .5;
    mouseY = event.clientY - (1000 - SCREEN_HEIGHT) * .5;
  }

  function documentMouseDownHandler(event) {
    mouseIsDown = true;
  }

  function documentMouseUpHandler(event) {
    mouseIsDown = false;
  }

  function documentTouchStartHandler(event) {
    if(event.touches.length == 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - (1000 - SCREEN_WIDTH) * .5;;
      mouseY = event.touches[0].pageY - (1000 - SCREEN_HEIGHT) * .5;
    }
  }

  function documentTouchMoveHandler(event) {
    if(event.touches.length == 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - (1000 - SCREEN_WIDTH) * .5;;
      mouseY = event.touches[0].pageY - (1000 - SCREEN_HEIGHT) * .5;
    }
  }

  function windowResizeHandler() {
    SCREEN_WIDTH = 1000;
    SCREEN_HEIGHT = 666;

    canvas.width = 1000;
    canvas.height = 666;
    canvas2.width = 1000;
    canvas2.height = 666;
  }

  function loop() {

    if( mouseIsDown ) {
      RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.02);
    }
    else {
      RADIUS_SCALE -= ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.02);
    }

    RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );

    context2.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    context2.drawImage(canvas,0,0);

    context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    context.globalAlpha = .98;
    context.drawImage(canvas2,0,0);

    context.globalAlpha = 1;
    for (i = 0, len = particles.length; i < len; i++) {
      var particle = particles[i];

      var lp = { x: particle.position.x, y: particle.position.y };

      // Rotation
      particle.offset.x += ((mouseX/SCREEN_WIDTH)-.5)*2 * particle.speed;
      particle.offset.y += ((mouseX/SCREEN_WIDTH)-.5)*2 * particle.speed;

      // Follow mouse with some lag
      particle.shift.x += 0;
      particle.shift.y += 0;

      // Apply position
      particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit*RADIUS_SCALE);
      particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit*RADIUS_SCALE);

      // Limit to screen bounds
      particle.position.x = Math.max( Math.min( particle.position.x, SCREEN_WIDTH ), 0 );
      particle.position.y = Math.max( Math.min( particle.position.y, SCREEN_HEIGHT ), 0 );

      particle.size += ( particle.targetSize - particle.size ) * 0.05;

      if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
        particle.targetSize = 1 + Math.random() * 3;
      }

      context.beginPath();
      context.fillStyle = setFillColor(i);
      context.lineWidth = particle.size;
      context.moveTo(lp.x, lp.y);
      context.lineTo(particle.position.x, particle.position.y);
      context.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
      context.fill();
    }
  }

  function setFillColor(num) {
    num%3 ? context.fillStyle="#9DB2ED" : context.fillStyle="#E52C58";
  }

  window.onload = init;

}())
