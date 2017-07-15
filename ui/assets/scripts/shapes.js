
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  var currX = 0;
  var currY = 0;
  var xpos = 0;
  var ypos = 0;

  var camera, scene, renderer, stats;
  var pointLight, pointLight2;
  var torusKnot;
  var plane1, plane2, plane3;
  var lines, lightLine, lightLine_geo;
  var cubeMaterial;
  var poly1, poly2, poly3;
  var lights;

  init();
  animate();

  function init() {

    initScene();
    initMisc();

    document.body.appendChild( renderer.domElement );

  }

  function initScene() {

    camera = new THREE.PerspectiveCamera( 15, winW / winH, 1, 1000 );
    camera.position.set( -12, 0, 50 );

    scene = new THREE.Scene();
    // scene.add( new THREE.AmbientLight( 0x222222 ) );

    // Lights

    function createLight( color ) {

      var pointLight = new THREE.PointLight( color, 1, 30 );
      pointLight.castShadow = true;
      pointLight.shadow.camera.near = 1;
      pointLight.shadow.camera.far = 50;
      pointLight.shadow.bias = 0.1;

      var geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
      var material = new THREE.MeshBasicMaterial( { color: color } );
      var sphere = new THREE.Mesh( geometry, material );
      pointLight.add( sphere );

      return pointLight

    }

    lights = new THREE.Object3D();

    // pointLight1 = createLight( 0x333333 );
    // lights.add( pointLight1 );

    // pointLight2 = createLight( 0x444444 );
    // lights.add( pointLight2 );

    // pointLight3 = createLight( 0x555555 );
    // lights.add( pointLight3 );

    // pointLight4 = createLight( 0x666666 );
    // lights.add( pointLight4 );

    lines_material = new THREE.LineBasicMaterial({
      color: 0xcccccc,
      linewidth: .1,
      opacity: 0.1,
      transparent: true
    });
    lines_material2 = new THREE.LineBasicMaterial({
      color: 0xcccccc,
      linewidth: .1,
      opacity: 0.1,
      transparent: true
    });
    lines_material3 = new THREE.LineBasicMaterial({
      color: 0xcccccc,
      linewidth: .1,
      opacity: 0.1,
      transparent: true
    });
    scene.add( lights )


    // pointLight1.position.x = 20
    // pointLight1.position.y = 20
    // pointLight1.position.z = 10

    // pointLight2.position.x = -15
    // pointLight2.position.y = 15
    // pointLight2.position.z = 15

    // pointLight3.position.x = 12
    // pointLight3.position.y = -15
    // pointLight3.position.z = 15

    // pointLight4.position.x = 15
    // pointLight4.position.y = 15
    // pointLight4.position.z = -15


    // Meshes

    poly1 = new THREE.Object3D();
    poly2 = new THREE.Object3D();
    poly3 = new THREE.Object3D();

    var lines_geometry = new THREE.Geometry();
    lines_geometry.vertices.push(
      new THREE.Vector3( 0, 0, 6.2 ),
      new THREE.Vector3( 6.2, 0, 0 ),
      new THREE.Vector3( 0 , 6.2, 0 ),
      new THREE.Vector3( 0, 0, 6.2 ),
      new THREE.Vector3( 0, -6.2, 0 ),
      new THREE.Vector3( 6.2, 0, 0 ),
      new THREE.Vector3( 0, 6.2, 0 ),
      new THREE.Vector3( -6.2, 0, 0 ),
      new THREE.Vector3( 0, -6.2, 0 ),
      new THREE.Vector3( 0, 0, -6.2 ),
      new THREE.Vector3( -6.2, 0, 0 ),
      new THREE.Vector3( 0, 6.2, 0 ),
      new THREE.Vector3( 0, 0, -6.2 ),
      new THREE.Vector3( 6.2, 0, 0 ),
      new THREE.Vector3( 0, 6.2, 0 ),
      new THREE.Vector3( 0, 0, 6.2),
      new THREE.Vector3( -6.2, 0, 0)
    );

    lines1 = new THREE.Line( lines_geometry, lines_material );
    poly1.add( lines1 );

    var lines_geometry2 = new THREE.Geometry();
    lines_geometry2.vertices.push(
      new THREE.Vector3( 0, 0, 1.2 ),
      new THREE.Vector3( 1.2, 0, 0 ),
      new THREE.Vector3( 0 , 1.2, 0 ),
      new THREE.Vector3( 0, 0, 1.2 ),
      new THREE.Vector3( 0, -1.2, 0 ),
      new THREE.Vector3( 1.2, 0, 0 ),
      new THREE.Vector3( 0, 1.2, 0 ),
      new THREE.Vector3( -1.2, 0, 0 ),
      new THREE.Vector3( 0, -1.2, 0 ),
      new THREE.Vector3( 0, 0, -1.2 ),
      new THREE.Vector3( -1.2, 0, 0 ),
      new THREE.Vector3( 0, 1.2, 0 ),
      new THREE.Vector3( 0, 0, -1.2 ),
      new THREE.Vector3( 1.2, 0, 0 ),
      new THREE.Vector3( 0, 1.2, 0 ),
      new THREE.Vector3( 0, 0, 1.2),
      new THREE.Vector3( -1.2, 0, 0)
    );

    lines2 = new THREE.Line( lines_geometry2, lines_material2 );
    poly2.add( lines2 );

    var lines_geometry3 = new THREE.Geometry(-10,0,0);
    lines_geometry3.vertices.push(
      new THREE.Vector3( 0, 0, 6.2 ),
      new THREE.Vector3( 6.2, 0, 0 ),
      new THREE.Vector3( 0 , 6.2, 0 ),
      new THREE.Vector3( 0, 0, 6.2 ),
      new THREE.Vector3( 0, -6.2, 0 ),
      new THREE.Vector3( 6.2, 0, 0 ),
      new THREE.Vector3( 0, 6.2, 0 ),
      new THREE.Vector3( -6.2, 0, 0 ),
      new THREE.Vector3( 0, -6.2, 0 ),
      new THREE.Vector3( 0, 0, -6.2 ),
      new THREE.Vector3( -6.2, 0, 0 ),
      new THREE.Vector3( 0, 6.2, 0 ),
      new THREE.Vector3( 0, 0, -6.2 ),
      new THREE.Vector3( 6.2, 0, 0 ),
      new THREE.Vector3( 0, 6.2, 0 ),
      new THREE.Vector3( 0, 0, 6.2),
      new THREE.Vector3( -6.2, 0, 0)
    );

    lines3 = new THREE.Line( lines_geometry3, lines_material3 );
    poly3.add( lines3 );

    // var plane_material = new THREE.MeshPhongMaterial({
    //   // map:THREE.ImageUtils.loadTexture('images/person.jpg'), transparent: true,
    //   color: 0x333333,
    //   shininess: 10,
    //   specular: 0xffffff,
    //   opacity: 0.9,
    //   transparent: true
    // });

    // var plane1Geo = new THREE.BoxGeometry(10, 15, 0.1)
    // plane1 = new THREE.Mesh( plane1Geo,plane_material );
    // plane1.castShadow = true;
    // plane1.receiveShadow = true;

    // var plane2Geo = new THREE.BoxGeometry(10, 15, 0.1)
    // plane2 = new THREE.Mesh( plane2Geo, plane_material );
    // plane2.castShadow = true;
    // plane2.receiveShadow = true;

    // var plane3Geo = new THREE.BoxGeometry(10, 15, 0.1)
    // plane3 = new THREE.Mesh( plane1Geo,plane_material );
    // plane3.castShadow = true;
    // plane3.receiveShadow = true;

    // poly.add( plane1, plane2, plane3 );
    scene.add(poly1);
    scene.add(poly2);

    // plane2.rotation.x = 1.5708
    // plane2.rotation.y = 1.5708

    // plane3.rotation.x = 1.5708
    // plane3.rotation.z = 1.5708

    // plane1.position.y = 30
    // plane2.position.z = 30
    // plane3.position.x = 30

  }

  function initMisc() {

    renderer = new THREE.WebGLRenderer({ antialiasing: true, alpha: true });
    renderer.setClearColor( 0x000000, 0);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

  }

  function animate() {

    requestAnimationFrame( animate );

    poly1.rotation.y += -.01
    poly1.rotation.x += -.01
    poly2.rotation.y += -.01
    poly2.rotation.x += -.01
    poly2.position.x = -15;
    poly2.position.y = -5;
    // camera.rotation.x += .01

    // plane1.position.y += .02*(0-plane1.position.y)
    // plane2.position.z += .02*(0-plane2.position.z)
    // plane3.position.x += .02*(0-plane3.position.x)

    render();

  }

  function render() {
    renderer.render( scene, camera );
  }


  window.addEventListener("mousemove", function (e) {
      findxy('move', e)
  }, false);
  window.addEventListener("mousedown", function (e) {
    touched = true;
      findxy('down', e)
  }, false);
  window.addEventListener("mouseup", function (e) {
      findxy('up', e)
  }, false);

  function findxy(res, e) {

    var touchMove = e; // .originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    xpos = touchMove.pageX - winW/2;
    ypos = touchMove.pageY - winH/2;
    currX = xpos;
    currY = ypos;
  }
