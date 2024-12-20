import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// create canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

document.body.appendChild(renderer.domElement);
// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
    45,
    innerWidth/innerHeight,
    0.1,
    1000
)
camera.position.set(-10,30,30);

// create helper
const axesHelper = new THREE.AxesHelper(5);

//create orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);

//create box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
})
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 1;

//create sphere
const sphereGeometry = new THREE.SphereGeometry(2, 30, 30);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00fff,
    wireframe: true
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10,10);

// create plane
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;

// create grid helper
const gridHelper = new THREE.GridHelper(30);
const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
}
gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e);
})
gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
})

gui.add(options, 'speed', 0, 0.1).onChange((e) => {
    sphere.material.wireframe = e;
})

const helpers = [axesHelper, plane, gridHelper];
const sceneElements = [...helpers,box,sphere]

sceneElements.forEach((item) => {scene.add(item)})

let step = 0;
let speed = 0.01;
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))


    // add camera and scene in canvas and render
    renderer.render(scene, camera);
}
// start animation
// animate(10)
renderer.setAnimationLoop(animate);