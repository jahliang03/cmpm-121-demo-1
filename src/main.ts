import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "bear clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerText = "🐻"; // Emoji displayed in button
app.append(button);

let count: number = 0;
let growthRate: number = 0; // Initial growth rate is 0
let honeyA: number = 0; // Counter for type A jars bought
let honeyB: number = 0; // Counter for type B jars bought
let honeyC: number = 0; // Counter for type C jars bought

let priceA: number = 10; // Initial price for A
let priceB: number = 100; // Initial price for B
let priceC: number = 1000; // Initial price for C

const countDiv = document.createElement("div");
countDiv.innerText = `${count} bears`;
app.append(countDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.innerText = `Growth Rate: ${growthRate.toFixed(1)} bears/sec`;
app.append(growthRateDiv);

const honeyDiv = document.createElement("div");
honeyDiv.innerText = `A: ${honeyA}, B: ${honeyB}, C: ${honeyC}`;
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

  // Update each purchase button's disabled state based on current count
  purchaseButtonA.disabled = count < priceA;
  purchaseButtonB.disabled = count < priceB;
  purchaseButtonC.disabled = count < priceC;
};

// Animation frame function to increment counter smoothly
let lastUpdateTime = performance.now();

const animate = (time: number) => {
  const elapsedTime = (time - lastUpdateTime) / 1000;
  lastUpdateTime = time;

  incrementCounter(growthRate * elapsedTime);
  requestAnimationFrame(animate);
};

// Start the animation loop
requestAnimationFrame(animate);

// Function to update button text with current price
const updateButtonText = (button: HTMLButtonElement, type: string, price: number, rate: number) => {
  button.innerText = `Item ${type} (${rate}/sec, ${price.toFixed(2)} units)`;
};

// Create purchase buttons for each upgrade type
const purchaseButtonA = document.createElement("button");
updateButtonText(purchaseButtonA, "A", priceA, 0.1);
purchaseButtonA.disabled = true;
app.append(purchaseButtonA);

const purchaseButtonB = document.createElement("button");
updateButtonText(purchaseButtonB, "B", priceB, 2.0);
purchaseButtonB.disabled = true;
app.append(purchaseButtonB);

const purchaseButtonC = document.createElement("button");
updateButtonText(purchaseButtonC, "C", priceC, 50.0);
purchaseButtonC.disabled = true;
app.append(purchaseButtonC);

// Handle upgrade purchase logic for each type
purchaseButtonA.addEventListener("click", () => {
  if (count >= priceA) {
    count -= priceA;
    growthRate += 0.1;
    honeyA += 1;
    priceA *= 1.15; // Increase price by 15%
    updateButtonText(purchaseButtonA, "A", priceA, 0.1);
    updateDisplays();
  }
});

purchaseButtonB.addEventListener("click", () => {
  if (count >= priceB) {
    count -= priceB;
    growthRate += 2.0;
    honeyB += 1;
    priceB *= 1.15; // Increase price by 15%
    updateButtonText(purchaseButtonB, "B", priceB, 2.0);
    updateDisplays();
  }
});

purchaseButtonC.addEventListener("click", () => {
  if (count >= priceC) {
    count -= priceC;
    growthRate += 50.0;
    honeyC += 1;
    priceC *= 1.15; // Increase price by 15%
    updateButtonText(purchaseButtonC, "C", priceC, 50.0);
    updateDisplays();
  }
});

// Function to update all relevant displays
const updateDisplays = () => {
  growthRateDiv.innerText = `Growth Rate: ${growthRate.toFixed(1)} bears/sec`;
  honeyDiv.innerText = `A: ${honeyA}, B: ${honeyB}, C: ${honeyC}`;
  incrementCounter(0); // Update countDiv and button states
};

// Append all elements to the app container
app.append(
  header,
  button,
  purchaseButtonA,
  purchaseButtonB,
  purchaseButtonC,
  countDiv,
  honeyDiv,
  growthRateDiv,
);