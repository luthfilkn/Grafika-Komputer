const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB); // Warna latar belakang biru langit
document.body.appendChild(renderer.domElement);

// Create a bowl
const wltextureLoader = new THREE.TextureLoader();
const bowlTexture = wltextureLoader.load('image/bowl.jpg');
const bowlMaterial = new THREE.MeshStandardMaterial({ map: bowlTexture });
const bowlGeometry = new THREE.SphereGeometry(0.4, 256, 256, 0, Math.PI * 2, Math.PI / 2, Math.PI); // Increase segments to 64
const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
bowl.position.set(0, 1.6, 0); // Set the position above the table top
bowl.castShadow = true;
scene.add(bowl);

// Create the shape for the plate
const plateShape = new THREE.Shape();
const radius = 0.2;
const segments = 32;

// Create a circle shape
plateShape.moveTo(radius, 0);
for (let i = 1; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    plateShape.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
}

// Define extrude settings for the thickness
const extrudeSettings = {
    depth: 0.03, // Thickness of the plate
    bevelEnabled: false
};

// Create the extruded geometry
const plateGeometry = new THREE.ExtrudeGeometry(plateShape, extrudeSettings);
const plateTextureLoader = new THREE.TextureLoader();
const plateTexture = plateTextureLoader.load('image/plate.jpg');
const plateMaterial = new THREE.MeshStandardMaterial({ map: plateTexture, side: THREE.DoubleSide });
const plate = new THREE.Mesh(plateGeometry, plateMaterial);
plate.position.set(0, 1.2, 0); // Set the position under the bowl
plate.rotation.x = -Math.PI / 2; // Rotate to be horizontal
plate.castShadow = true;
plate.receiveShadow = true;
scene.add(plate);

// Create a glass with an open top
const glassGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32, 1, true); // Set openEnded to true
const glassMaterial = new THREE.MeshStandardMaterial({ color: 0xFFC0CB, transparent: true, opacity: 0.8 });
const glass = new THREE.Mesh(glassGeometry, glassMaterial);
glass.position.set(1.3, 1.5, 0); // Set the position above the table top
glass.castShadow = true;
scene.add(glass);

// Load texture for table top
const ttextureLoader = new THREE.TextureLoader();
const tableTopTexture = ttextureLoader.load('image/table.jpg');
const tableTopMaterial = new THREE.MeshStandardMaterial({ map: tableTopTexture });

// Create table top
const tableTopGeometry = new THREE.BoxGeometry(4, 0.2, 2);
const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
tableTop.position.y = 1.1;
tableTop.castShadow = true; // Objek ini dapat melempar bayangan
tableTop.receiveShadow = true; // Objek ini menerima bayangan dari objek lain
scene.add(tableTop);

// Create table legs
const legGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
const legMaterial = new THREE.MeshStandardMaterial({ color: 0xC4A484 });

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

// Load floor texture
const TextureLoader = new THREE.TextureLoader();
const floorTexture = TextureLoader.load('image/floor.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4); // Repeat the texture 4 times in both directions
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floorGeometry = new THREE.BoxGeometry(10, 0.1, 10);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor);

// Ceiling
const textureLoader = new THREE.TextureLoader();    
const ceilingTexture = textureLoader.load('image/ceiling.jpg');
ceilingTexture.wrapS = THREE.RepeatWrapping;
ceilingTexture.wrapT = THREE.RepeatWrapping;
ceilingTexture.repeat.set(4, 4);
const ceilingMaterial = new THREE.MeshStandardMaterial({ map: ceilingTexture });
const ceilingGeometry = new THREE.BoxGeometry(10, 0.1, 10);
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceiling.position.y = 5;
ceiling.receiveShadow = true;
scene.add(ceiling);

// Create ceiling light
const ceilingLight = new THREE.PointLight(0xffffff, 0, 10);
ceilingLight.position.set(0, 4.9, 0); // Atur posisi di langit-langit
scene.add(ceilingLight);

// Create a sphere to represent the light bulb
const lightBulbGeometry = new THREE.CylinderGeometry(0.1, 0.5, 0.5, 32);
const lightBulbMaterial = new THREE.MeshBasicMaterial({ color: 0x8B8000 }); // Yellow color for the light bulb
const lightBulb = new THREE.Mesh(lightBulbGeometry, lightBulbMaterial);
lightBulb.position.set(0, 4.7, 0);
scene.add(lightBulb);

// Create shape for the back wall with a window
const backWallShape = new THREE.Shape();
backWallShape.moveTo(-5, 0);
backWallShape.lineTo(5, 0);
backWallShape.lineTo(5, 5);
backWallShape.lineTo(-5, 5);
backWallShape.lineTo(-5, 0);

// Create the window hole
const windowHole = new THREE.Path();
windowHole.moveTo(-1, 3.5); // Adjust window position
windowHole.lineTo(1, 3.5);
windowHole.lineTo(1, 1.5);
windowHole.lineTo(-1, 1.5);
windowHole.lineTo(-1, 3.5);
backWallShape.holes.push(windowHole);

// Create the back wall geometry with the window hole
const btextureLoader = new THREE.TextureLoader();
const backWallTexture = btextureLoader.load('image/backwall.jpg');
backWallTexture.wrapS = THREE.RepeatWrapping;
backWallTexture.wrapT = THREE.RepeatWrapping;
backWallTexture.repeat.set(0.5, 0.5); // Mengulang tekstur 4.4 kali pada sumbu x
const backWallMaterial = new THREE.MeshStandardMaterial({ map: backWallTexture });
const backWallGeometry = new THREE.ExtrudeGeometry(backWallShape, { depth: 0.1, bevelEnabled: false });
const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial); // Mengganti wallMaterial menjadi backWallMaterial
backWall.position.set(0, 0, -5);
scene.add(backWall);

// Left wall
const ltextureLoader = new THREE.TextureLoader();    
const leftWallTexture = ltextureLoader.load('image/leftwall.jpg');
leftWallTexture.wrapS = THREE.RepeatWrapping;
leftWallTexture.wrapT = THREE.RepeatWrapping;
leftWallTexture.repeat.set(4, 4);
const leftWallMaterial = new THREE.MeshStandardMaterial({ map: leftWallTexture });
const leftWallGeometry = new THREE.BoxGeometry(10, 5, 0.1);
const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-5, 2.5, 0);
scene.add(leftWall);

// Right wall
const rtextureLoader = new THREE.TextureLoader();    
const rightWallTexture = rtextureLoader.load('image/rightwall.jpg');
rightWallTexture.wrapS = THREE.RepeatWrapping;
rightWallTexture.wrapT = THREE.RepeatWrapping;
rightWallTexture.repeat.set(4, 4);
const rightWallMaterial = new THREE.MeshStandardMaterial({ map: rightWallTexture });
const rightWallGeometry = new THREE.BoxGeometry(10, 5, 0.1);
const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
rightWall.rotation.y = Math.PI / 2;
rightWall.position.set(5, 2.5, 0);
scene.add(rightWall);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Opsional: mengatur jenis bayangan yang lebih lembut
// Add directional light for shadow casting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(0, 2.5, -4.9);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.camera.bottom = 0;
scene.add(directionalLight);

// Add the window mesh separately to ensure proper material handling
const wtextureLoader = new THREE.TextureLoader();
const windowTexture = wtextureLoader.load('image/windows.png')
const windowMaterial = new THREE.MeshStandardMaterial({ map: windowTexture, transparent: true, opacity: 0.5 });
const windowGeometry = new THREE.PlaneGeometry(2, 2);
const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
windowMesh.position.set(0, 2.5, -4.9); // Posisi jendela di dinding belakang
scene.add(windowMesh);

// Create the chair seat
const stextureLoader = new THREE.TextureLoader();
const seatTexture = stextureLoader.load('image/seat.jpg');

const seatMaterial = new THREE.MeshStandardMaterial({ map: seatTexture });

const seatGeometry = new THREE.BoxGeometry(1, 0.1, 1.2);
const seat = new THREE.Mesh(seatGeometry, seatMaterial);
seat.position.set(0, 0.8, 2);
seat.castShadow = true;
scene.add(seat);

// Create chair legs
const legGeometryChair = new THREE.BoxGeometry(0.1, 0.7, 0.1);
const legMaterialChair = new THREE.MeshStandardMaterial({ color: 0xC4A484 });

const chairLeg1 = new THREE.Mesh(legGeometryChair, legMaterialChair);
chairLeg1.position.set(-0.45, 0.40, 1.45);
scene.add(chairLeg1);

const chairLeg2 = new THREE.Mesh(legGeometryChair, legMaterialChair);
chairLeg2.position.set(0.45, 0.40, 1.45);
scene.add(chairLeg2);

const chairLeg3 = new THREE.Mesh(legGeometryChair, legMaterialChair);
chairLeg3.position.set(-0.45, 0.40, 2.55);
scene.add(chairLeg3);

const chairLeg4 = new THREE.Mesh(legGeometryChair, legMaterialChair);
chairLeg4.position.set(0.45, 0.40, 2.55);
scene.add(chairLeg4);

// Create the chair backrest
const brtextureLoader = new THREE.TextureLoader();
const backrestTexture = brtextureLoader.load('image/rest.jpg');
const backrestMaterial = new THREE.MeshStandardMaterial({ map: backrestTexture });
const backrestGeometry = new THREE.BoxGeometry(1, 1.5, 0.1);
const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
backrest.position.set(0, 1.5, 2.55);
scene.add(backrest);

// Set camera position
camera.position.set(0, 3, 7);
camera.lookAt(0, 1, 0); // Looking at the center of the table

const keys = {};
let mouseX = 0;
let mouseY = 0;

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

document.addEventListener('mousemove', (event) => {
    mouseX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    mouseY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
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
    if (keys['r']) {
        camera.position.y += shiftSpeed;
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

// Function to update camera rotation based on mouse movement
function updateCameraRotation() {
    const rotateSpeed = 0.0010;
    camera.rotation.y -= mouseX * rotateSpeed;
    camera.rotation.x -= mouseY * rotateSpeed;
    const maxRotationX = Math.PI / 2;
    camera.rotation.x = Math.max(-maxRotationX, Math.min(maxRotationX, camera.rotation.x));

    mouseX = 0;
    mouseY = 0;
}

// Rendering function
function animate() {
    requestAnimationFrame(animate);
    updateCameraMovement();
    updateCameraRotationArrowKeys();
    updateCameraRotation();
    renderer.render(scene, camera);
}

animate();
