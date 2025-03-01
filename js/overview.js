import "../css/overview.css"

import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});


const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none'; // So it doesn’t block mouse interactions with the 3D scene
document.body.appendChild(labelRenderer.domElement);





renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera); 


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color: 0x071a52});
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){



    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    star.position.set(x,y,z);

    scene.add(star);

}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('../universe.png');
scene.background = spaceTexture;



function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;


    controls.update();

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
   
}

animate()


// Logo
const logoTexture = new THREE.TextureLoader().load('../logo.png');

const logo = new THREE.Mesh(

    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( {map: logoTexture})

);

scene.add(logo)

// Moon

const moonTexture = new THREE.TextureLoader().load('../moon.jpg')

const moon = new THREE.Mesh(

    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: moonTexture,
    })
)

scene.add(moon)


const capsuleTexture = new THREE.TextureLoader().load('../capsule2.jpeg')


// Create a function to add a capsule and a label
function createCapsule(position, labelText, linkUrl) {
    const capsule = new THREE.Mesh(
        new THREE.CapsuleGeometry(3, 10, 3),
        new THREE.MeshStandardMaterial({
            map: capsuleTexture,
        })
    );

    // Set position of the capsule
    capsule.position.set(position.x, position.y, position.z);

    // Add capsule to the scene
    scene.add(capsule);

    // Create a label div
    const capsuleLabelDiv = document.createElement('div');
    capsuleLabelDiv.className = 'capsule-label';

    const capsuleLink = document.createElement('a');
    capsuleLink.href = linkUrl;
    capsuleLink.textContent = labelText;
    capsuleLink.style.color = 'white'; // Make sure the text color is white
    capsuleLink.style.textDecoration = 'none'; // Remove underline
    capsuleLabelDiv.appendChild(capsuleLink);

    // Create a CSS2DObject and attach it to the capsule
    const capsuleLabel = new CSS2DObject(capsuleLabelDiv);
    capsuleLabel.position.set(0, 10, 0); // Position label above the capsule

    // Add label to the capsule
    capsule.add(capsuleLabel);

    return capsule;
}
// Create and position capsules with labels and links to your other HTML files
const capsule1 = createCapsule({ x: 40, y: 0, z: -40 }, 'About Us', './about.html');
const capsule2 = createCapsule({ x: -40, y: 0, z: -40 }, 'Chapter 1', './chapter1.html');
const capsule3 = createCapsule({ x: -5, y: -20, z: 50 }, 'Glossary', './glossary.html');
const capsule4 = createCapsule({ x: -30, y: 40, z: -80 }, 'Personal', './personal.html');
const capsule5 = createCapsule({ x: 20, y: 0, z: 30 }, 'History', './history.html');
const capsule6 = createCapsule({ x: -20, y: 0, z: 30 }, 'Forum', './forum.html');
const capsule7 = createCapsule({ x: -40, y: 0, z: 0 }, 'More', './more.html');
const capsule8 = createCapsule({ x: 0, y: 25, z: 0 }, 'Explore', './explore.html');

moon.position.z = 0;
moon.position.y = 0;
moon.position.setX(50);


function moveCamera(){

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    logo.rotation.y += 0.01;
    logo.rotation.z += 0.01;


    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera


// Raycaster for detecting clicks on the moon
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObject(moon);

    if (intersects.length > 0) {
        // Redirect to another page
        window.location.href = '../index.html';
    }
}

window.addEventListener('click', onMouseClick);


// window.addEventListener('resize', function(){

//     labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight);

// })
