const gradient = document.getElementById("gradient");

let step = 0;
const gradientSpeed = 0.002;

// Define color palette
const colors = [
  [50, 50, 50],
  [0, 200, 300],
  
];

let colorIndices = [0, 1]

function updateGradient() {
  const c0_0 = colors[colorIndices[0]];
  const c0_1 = colors[colorIndices[1]];
  const c1_0 = colors[colorIndices[0]];
  const c1_1 = colors[colorIndices[0]];

  const istep = 1 - step;
  const color1 = `rgb(${Math.round(istep * c0_0[0] + step * c0_1[0])},
                      ${Math.round(istep * c0_0[1] + step * c0_1[1])},
                      ${Math.round(istep * c0_0[2] + step * c0_1[2])})`;

  const color2 = `rgb(${Math.round(istep * c1_0[0] + step * c1_1[0])},
                      ${Math.round(istep * c1_0[1] + step * c1_1[1])},
                      ${Math.round(istep * c1_0[2] + step * c1_1[2])})`;

  gradient.style.background = `linear-gradient(120deg, ${color1}, ${color2})`;
  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    // Pick new target indices
    colorIndices[0] = (colorIndices[0] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
  }
  requestAnimationFrame(updateGradient);
}
// Start the animation
requestAnimationFrame(updateGradient);
