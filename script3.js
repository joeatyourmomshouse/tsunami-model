const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create the ocean surface
const geometry = new THREE.PlaneGeometry(100, 100, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x1e90ff, wireframe: true });
const ocean = new THREE.Mesh(geometry, material);
ocean.rotation.x = -Math.PI / 2;
scene.add(ocean);

// Set up lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Camera position
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Animation variables
let time = 0;
let simulationRunning = false;

function animate() {
    if (simulationRunning) {
        time += 0.1;
        const position = ocean.geometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const z = position.getZ(i);
            const waveHeight = Math.sin((x + time) * 0.5) * Math.cos((z + time) * 0.5);
            position.setY(i, waveHeight);
        }
        position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Play button functionality
document.getElementById('play-button').addEventListener('click', () => {
    simulationRunning = true;
    document.getElementById('overlay').style.display = 'none';
    displayTsunamiInfo();
});

// Educational text overlay
function displayTsunamiInfo() {
    const infoText = `
        Tsunamis are large ocean waves caused by underwater disturbances such as earthquakes or volcanic eruptions.
        As the wave approaches the shore, it can grow in height and cause significant damage.
    `;
    document.getElementById('info').innerHTML = infoText;
}
