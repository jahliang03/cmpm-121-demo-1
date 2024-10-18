import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Bear Clicker";
document.title = gameName;

// Create basic elements
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const bearButton = document.createElement("button");
bearButton.innerText = "🐻";
bearButton.id = "bearButton";
app.append(bearButton);

// Interface and Items
interface Item {
  name: string;
  price: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "honey apple 🍎", price: 10, rate: 0.1 },
  { name: "honey pot 🍯", price: 100, rate: 2 },
  { name: "honey hive 🍯🐝", price: 1000, rate: 50 },
];

// Initialize counters/prices
let count = 0;
let growthRate = 0;
let honeyA = 0, honeyB = 0, honeyC = 0;
let priceA = availableItems[0].price;
let priceB = availableItems[1].price;
let priceC = availableItems[2].price;

// Setup Display Elements
const countDiv = document.createElement("div");
countDiv.innerText = `${count} bears`;
app.append(countDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.innerText = `Growth Rate: ${growthRate.toFixed(1)} bears/sec`;
app.append(growthRateDiv);

const honeyDiv = document.createElement("div");
honeyDiv.innerText = `🍎 ${honeyA}, 🍯 ${honeyB}, 🍯🐝 ${honeyC}`;
app.append(honeyDiv);

// Increment counter
bearButton.addEventListener("click", () => incrementCounter(1));

const incrementCounter = (amount: number) => {
  count += amount;
  countDiv.innerText = `${count} bear${count !== 1 ? "s" : ""}`;

  // Update each purchase button's disabled state based on current count
  purchaseButtonA.disabled = count < priceA;
  purchaseButtonB.disabled = count < priceB;
  purchaseButtonC.disabled = count < priceC;
};

// Smooth Animation
let lastUpdateTime = performance.now();
const animate = (time: number) => {
  const elapsedTime = (time - lastUpdateTime) / 1000;
  lastUpdateTime = time;
  incrementCounter(growthRate * elapsedTime);
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);

// Button Update Function
const updateButtonText = (button: HTMLButtonElement, type: string, price: number, rate: number) => {
  button.innerText = `${type} (${rate}/sec, ${price.toFixed(2)} units)`;
};

// Create Purchase Buttons
const purchaseButtonA = document.createElement("button");
updateButtonText(purchaseButtonA, "honey apple 🍎", priceA, 0.1);
purchaseButtonA.disabled = true;
app.append(purchaseButtonA);

const purchaseButtonB = document.createElement("button");
updateButtonText(purchaseButtonB, "honey pot 🍯", priceB, 2.0);
purchaseButtonB.disabled = true;
app.append(purchaseButtonB);

const purchaseButtonC = document.createElement("button");
updateButtonText(purchaseButtonC, "honey hive 🍯🐝", priceC, 50.0);
purchaseButtonC.disabled = true;
app.append(purchaseButtonC);

// Purchase Event Listeners
purchaseButtonA.addEventListener("click", () => {
  if (count >= priceA) {
    count -= priceA;
    growthRate += 0.1;
    honeyA += 1;
    priceA *= 1.15;
    updateButtonText(purchaseButtonA, "honey apple 🍎", priceA, 0.1);
    updateDisplays();
  }
});

purchaseButtonB.addEventListener("click", () => {
  if (count >= priceB) {
    count -= priceB;
    growthRate += 2.0;
    honeyB += 1;
    priceB *= 1.15;
    updateButtonText(purchaseButtonB, "honey pot 🍯", priceB, 2.0);
    updateDisplays();
  }
});

purchaseButtonC.addEventListener("click", () => {
  if (count >= priceC) {
    count -= priceC;
    growthRate += 50.0;
    honeyC += 1;
    priceC *= 1.15;
    updateButtonText(purchaseButtonC, "honey hive 🍯🐝", priceC, 50.0);
    updateDisplays();
  }
});

// Update function to refresh display
const updateDisplays = () => {
  growthRateDiv.innerText = `Growth Rate: ${growthRate.toFixed(1)} bears/sec`;
  honeyDiv.innerText = `🍎 ${honeyA}, 🍯 ${honeyB}, 🍯🐝 ${honeyC}`;
  incrementCounter(0);
};

// Append all elements to the container
app.append(
  header,
  bearButton,
  purchaseButtonA,
  purchaseButtonB,
  purchaseButtonC,
  countDiv,
  honeyDiv,
  growthRateDiv
);
