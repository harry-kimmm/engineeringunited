import './style.css'

import * as THREE from 'three';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
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

const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff })

//Background Icosahedrone
const geometry = new THREE.IcosahedronGeometry(30, 0);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
const backgroundicosahedrone = new THREE.Mesh(geometry, material);
scene.add(backgroundicosahedrone);

//Background Octahedrons
const geometry2 = new THREE.OctahedronGeometry(30, 0);
const backgroundoctahedron = new THREE.Mesh(geometry2, material2);
backgroundoctahedron.position.set(-270, 0, -20);
scene.add(backgroundoctahedron);
const geometry3 = new THREE.OctahedronGeometry(20, 0);
const backgroundoctahedron2 = new THREE.Mesh(geometry3, material2);
backgroundoctahedron2.position.set(-300, 40, -20);
scene.add(backgroundoctahedron2);
const geometry4 = new THREE.OctahedronGeometry(10, 0);
const backgroundoctahedron3 = new THREE.Mesh(geometry4, material2);
backgroundoctahedron3.position.set(-300, -40, -20);
scene.add(backgroundoctahedron3);

function addDot() {
    const geometry = new THREE.SphereGeometry(0.5, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const dot = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

    dot.position.set(x, y, z);
    scene.add(dot);
}

Array(300).fill().forEach(addDot);

//Move camera on scroll
function moveCamera() {
    const t = document.body.getBoundingClientRect().top
    backgroundoctahedron.rotation.x += 0.005;
    backgroundoctahedron.rotation.y += 0.0075;
    backgroundoctahedron.rotation.z += 0.005;

    backgroundoctahedron2.rotation.x += 0.015;
    backgroundoctahedron2.rotation.y += 0.0175;
    backgroundoctahedron2.rotation.z += 0.015;

    backgroundoctahedron3.rotation.x += 0.015;
    backgroundoctahedron3.rotation.y += 0.0175;
    backgroundoctahedron3.rotation.z += 0.015;

    if (t > -1000) {
        camera.position.z = t * -0.075;
        camera.position.x = t * 0.05;
    }
    if (t <= -1000 && t >= -3800) {
        camera.position.x = t * 0.05;
    }
    if (t < -3800) {
        camera.position.z = t * -0.0175;
    }


}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);

    backgroundicosahedrone.rotation.x += 0.00125;
    backgroundicosahedrone.rotation.y += 0.0015;
    backgroundicosahedrone.rotation.z += 0.001;

    backgroundoctahedron.rotation.x += 0.000052;
    backgroundoctahedron.rotation.y += 0.0010;
    backgroundoctahedron.rotation.z += 0.0005;

    backgroundoctahedron2.rotation.x += 0.000052;
    backgroundoctahedron2.rotation.y += 0.0010;
    backgroundoctahedron2.rotation.z += 0.0005;

    backgroundoctahedron3.rotation.x += 0.000052;
    backgroundoctahedron3.rotation.y += 0.0010;
    backgroundoctahedron3.rotation.z += 0.0005;

    renderer.render(scene, camera);
}

animate()
