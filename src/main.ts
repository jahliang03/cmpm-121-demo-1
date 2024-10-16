import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "jasmine liang";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerText = "🐻"; // Emoji displayed in button
app.append(button);

let count: number = 0;
let growthRate: number = 0; // Initial growth rate is 0
let honey: number = 0; // Counter for honey jars bought
const countDiv = document.createElement("div");
countDiv.innerText = `${count} bears`;
app.append(countDiv);

const honeyDiv = document.createElement("div");
honeyDiv.innerText = `${honey} jars of honey`;
app.append(honeyDiv);

button.addEventListener("click", () => {
  incrementCounter(1);
});

// Increment counter function
const incrementCounter = (amount: number) => {
  count += amount;
  // Update text for singular/plural "bear" based on count
  if (count !== 1) {
    countDiv.innerText = `${count} bears`;
  } else {
    countDiv.innerText = `${count} bear`;
  }

  // Enable purchase button if count is 10 or more
  purchaseButton.disabled = count < 10;
};

// Animation frame function to increment counter smoothly
let lastUpdateTime = performance.now();

const animate = (time: number) => {
  const elapsedTime = (time - lastUpdateTime) / 1000; // Calculate the time elapsed in seconds
  lastUpdateTime = time;

  incrementCounter(growthRate * elapsedTime); // Increment counter by growthRate * elapsed time fraction
  requestAnimationFrame(animate); // Request the next frame
};

// Start the animation loop
requestAnimationFrame(animate);

// Create a purchase button
const purchaseButton = document.createElement("button");
purchaseButton.innerText = "Purchase Honey 🍯"; // Jar of honey emoji
purchaseButton.disabled = true; // Initially disabled
app.append(purchaseButton);

// Handle upgrade purchase logic
purchaseButton.addEventListener("click", () => {
  if (count >= 10) {
    count -= 10; // Deduct 10 units for purchase
    growthRate += 1; // Increase growth rate to gain more per second
    honey += 1; // Increment honey counter
    
    honeyDiv.innerText = `${honey} jars of honey`; // Update honey display
    incrementCounter(0); // Update display and purchase button state
  }
});

// Append all elements
app.append(header, button, purchaseButton, countDiv, honeyDiv);