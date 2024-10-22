const magnitudeInput = document.getElementById('magnitude');
const depthInput = document.getElementById('depth');
const wave = document.getElementById('wave');
const result = document.getElementById('result');
const simulateButton = document.getElementById('simulate');

magnitudeInput.addEventListener('input', () => {
    document.getElementById('magnitude-value').innerText = magnitudeInput.value;
});

depthInput.addEventListener('input', () => {
    document.getElementById('depth-value').innerText = depthInput.value;
});

simulateButton.addEventListener('click', () => {
    const magnitude = parseInt(magnitudeInput.value);
    const depth = parseInt(depthInput.value);
    
    // Calculate wave height based on magnitude and depth
    const waveHeight = (magnitude * 10) - (depth * 2);
    const displayHeight = Math.max(waveHeight, 0);

    wave.style.height = displayHeight + 'px';
    result.innerText = `Estimated Wave Height: ${displayHeight} cm`;
});
