import * as THREE from 'three';
// create canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

document.body.appendChild(renderer.domElement);
// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth/innerHeight,
    0.1,
    1000
)
camera.position.set(0,2,5);

// create helper
const axesHelper = new THREE.AxesHelper(5);

//create box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
const box = new THREE.Mesh(boxGeometry, boxMaterial);

// add box on scene
scene.add(box);
// add axes on scene
scene.add(axesHelper);

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    // add camera and scene in canvas and render
    renderer.render(scene, camera);
}
// start animation
renderer.setAnimationLoop(animate);