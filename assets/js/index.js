(function () {
  "use strict";

  var scene;
  var light;
  var ambient;
  var camera;
  var renderer;
  var loader;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var controls;
  var loader;
  var model;
  var geometry;
  var size;
  var length;
  var material;
  var mesh;

  //scene
  scene = new THREE.Scene();

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0.5, 1);
  light.scale.set(5, 5, 5);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x333333);
  scene.add(ambient);

  //camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 60, 200);
  camera.lookAt(scene.position);

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("stage").appendChild(renderer.domElement);

  // resize
  onResize();
  window.addEventListener("resize", onResize);

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  // model
  loader = new THREE.ColladaLoader();
  loader.load("assets/model/logi.dae", (collada) => {
    model = collada.scene;
    model.rotation.set(
      (270 * Math.PI) / 180,
      (360 * Math.PI) / 180,
      (-90 * Math.PI) / 180
    );
    model.position.y = -3;
    model.scale.set(3, 3, 3);
    scene.add(model);
  });

  //particle

  geometry = new THREE.Geometry();
  size = 1500;
  length = 5000;
  for (let i = 0; i < length; i++) {
    geometry.vertices.push(
      new THREE.Vector3(
        size * (Math.random() - 0.5),
        size * (Math.random() - 0.5),
        size * (Math.random() - 0.5)
      )
    );
  }

  material = new THREE.PointsMaterial({
    size: 4,
    color: 0xffffff,
  });

  mesh = new THREE.Points(geometry, material);
  scene.add(mesh);

  //controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.userRotate = true;
  controls.autoRotateSpeed = 12;
  controls.minDistance = 10;
  controls.maxDistance = 20;

  function animation() {
    requestAnimationFrame(animation);
    model.rotation.z += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }

  animation();
})();
