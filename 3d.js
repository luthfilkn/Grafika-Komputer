// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB); // Warna latar belakang biru langit
document.body.appendChild(renderer.domElement);

// Create a bowl
const bowlGeometry = new THREE.SphereGeometry(0.4, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI);
const bowlMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
bowl.position.set(0, 1.6, 0); // Set the position above the table top
scene.add(bowl);

// Create a glass
const glassGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32);
const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const glass = new THREE.Mesh(glassGeometry, glassMaterial);
glass.position.set(1.3, 1.5, 0); // Set the position above the table top
scene.add(glass);

// Create table top
const topGeometry = new THREE.BoxGeometry(4, 0.2, 2);
const topMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const tableTop = new THREE.Mesh(topGeometry, topMaterial);
tableTop.position.y = 1.1;
scene.add(tableTop);

// Create table legs
const legGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

const leg1 = new THREE.Mesh(legGeometry, legMaterial);
leg1.position.set(1.8, 0.5, 0.9);
scene.add(leg1);

const leg2 = new THREE.Mesh(legGeometry, legMaterial);
leg2.position.set(-1.8, 0.5, 0.9);
scene.add(leg2);

const leg3 = new THREE.Mesh(legGeometry, legMaterial);
leg3.position.set(1.8, 0.5, -0.9);
scene.add(leg3);

const leg4 = new THREE.Mesh(legGeometry, legMaterial);
leg4.position.set(-1.8, 0.5, -0.9);
scene.add(leg4);

// Create room
const roomMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.BackSide });

// Floor
const floorGeometry = new THREE.BoxGeometry(10, 0.1, 10);
const floor = new THREE.Mesh(floorGeometry, roomMaterial);
floor.position.y = 0;
scene.add(floor);

// Ceiling
const ceilingGeometry = new THREE.BoxGeometry(10, 0.1, 10);
const ceiling = new THREE.Mesh(ceilingGeometry, roomMaterial);
ceiling.position.y = 5;
scene.add(ceiling);

// Walls
const wallGeometry = new THREE.BoxGeometry(10, 5, 0.1);

// Back wall
const backWall = new THREE.Mesh(wallGeometry, roomMaterial);
backWall.position.z = -5;
backWall.position.y = 2.5;
scene.add(backWall);

// Left wall
const leftWall = new THREE.Mesh(wallGeometry, roomMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -5;
leftWall.position.y = 2.5;
scene.add(leftWall);

// Right wall
const rightWall = new THREE.Mesh(wallGeometry, roomMaterial);
rightWall.rotation.y = Math.PI / 2;
rightWall.position.x = 5;
rightWall.position.y = 2.5;
scene.add(rightWall);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

let mainLightOn = true;
let campfireLightOn = true;

// Set camera position
camera.position.set(0, 3, 7);
camera.lookAt(0, 1, 0); // Looking at the center of the table

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Function to update camera movement based on keys
function updateCameraMovement() {
    const moveSpeed = 0.1;
    const shiftSpeed = 0.05;
    if (keys['w']) {
        camera.position.z -= moveSpeed;
    }
    if (keys['s']) {
        camera.position.z += moveSpeed;
    }
    if (keys['a']) {
        camera.position.x -= moveSpeed;
    }
    if (keys['d']) {
        camera.position.x += moveSpeed;
    }
    if (keys['Shift']) {
        camera.position.y -= shiftSpeed;
    }
    if (keys[' ']) {
        camera.position.y += shiftSpeed;
    }
    if (keys['ArrowUp']) {
        camera.position.y -= shiftSpeed;
    }
    if (keys['ArrowDown']) {
        camera.position.y += shiftSpeed;
    }
    if (keys['q']) {
        if (mainLightOn) {
            directionalLight.intensity = 0;
        } else {
            directionalLight.intensity = 1;
        }
        mainLightOn = !mainLightOn;
        keys['q'] = false; // Prevents continuous toggling
    }
    if (keys['e']) {
        if (campfireLightOn) {
            campfireLight.intensity = 0;
        } else {
            campfireLight.intensity = 3;
        }
        campfireLightOn = !campfireLightOn;
        keys['e'] = false; // Prevents continuous toggling
    }
}

// Function to update camera rotation based on arrow keys
function updateCameraRotationArrowKeys() {
    const rotateSpeed = 0.01;
    if (keys['ArrowLeft']) {
        camera.rotation.y += rotateSpeed;
    }
    if (keys['ArrowRight']) {
        camera.rotation.y -= rotateSpeed;
    }
    if (keys['ArrowUp']) {
        camera.rotation.x += rotateSpeed;
    }
    if (keys['ArrowDown']) {
        camera.rotation.x -= rotateSpeed;
    }
}

// Rendering function
function animate() {
    requestAnimationFrame(animate);
    updateCameraMovement();
    updateCameraRotationArrowKeys();
    renderer.render(scene, camera);
}

// Mouse controls for scene rotation
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

function onMouseMove(event) {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        const rotationSpeed = 0.0025;

        const quaternionX = new THREE.Quaternion();
        const quaternionY = new THREE.Quaternion();

        quaternionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), deltaMove.y * rotationSpeed);
        quaternionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), deltaMove.x * rotationSpeed);

        scene.quaternion.multiplyQuaternions(quaternionY, scene.quaternion);
        scene.quaternion.multiplyQuaternions(quaternionX, scene.quaternion);

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseUp() {
    isDragging = false;
}

document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);

animate();
