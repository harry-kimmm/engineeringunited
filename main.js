import './style.css'

import * as THREE from 'three';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30)


renderer.render(scene, camera);

//helpers
//const controls = new OrbitControls(camera, renderer.domElement);

//Lighting
const pointLight = new THREE.PointLight(0xffffff, 10, 200);;
pointLight.position.set(25, 25, 25);
scene.add(pointLight);

//Background Icosahedrone
const geometry = new THREE.IcosahedronGeometry(30, 0);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
const backgroundicosahedrone = new THREE.Mesh(geometry, material);
scene.add(backgroundicosahedrone);

function addDot() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const dot = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

  dot.position.set(x, y, z);
  scene.add(dot);
}

Array(300).fill().forEach(addDot);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top

  camera.position.z = t * -0.075;
  camera.position.x = t * 0.03;

}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  backgroundicosahedrone.rotation.x += 0.00125;
  backgroundicosahedrone.rotation.y += 0.0015;
  backgroundicosahedrone.rotation.z += 0.001;

  renderer.render(scene, camera);
}

animate()

