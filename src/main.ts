import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Bear Shop";
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
  description: string;
}

const availableItems: Item[] = [
  { name: "🍎", price: 10, rate: 0.1, description: "Honey Apple: A sweet apple that attracts bears." },
  { name: "🍯", price: 100, rate: 2, description: "Honey Pot: A pot of honey with bear-attracting aromas." },
  { name: "🍯🐝", price: 1000, rate: 50, description: "Bee Hive: an entire hive dedicated to producing honey." },
  { name: "🍯🐻", price: 5000, rate: 100, description: "Booster Syrup: A mysterious syrup that doubles bear productivity." },
  { name: "🍯🏭", price: 20000, rate: 500, description: "Honey Factory: A factory that mass-produces honey delights." },
];

// Initialize counters/prices
let count = 0;
let growthRate = 0;


// Setup Display Elements
const countDiv = document.createElement("div");
countDiv.innerText = `${count} bears`;
app.append(countDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.innerText = `Growth Rate: ${growthRate.toFixed(1)} bears/sec`;
app.append(growthRateDiv);

const honeyDiv = document.createElement("div");
honeyDiv.innerText = `${availableItems.map(item => `${item.name} 0`).join(', ')}`;
app.append(honeyDiv);

// Create Description Display Element
const descriptionDiv = document.createElement("div");
descriptionDiv.style.marginBottom = "10px"; // Add some space after the description
app.append(descriptionDiv); // Append this after the header and before other elements

// Increment counter
bearButton.addEventListener("click", () => incrementCounter(1));

const incrementCounter = (amount: number) => {
  count += amount;
  countDiv.innerText = `${count} bear${count !== 1 ? "s" : ""}`;
  updateButtonStates();
};

const updateButtonStates = () => {
  const thresholds = [availableItems[0].price, availableItems[1].price,availableItems[2].price, availableItems[3].price, availableItems[4].price];
  [purchaseButtonA, purchaseButtonB, purchaseButtonC, purchaseButtonD, purchaseButtonE].forEach((button, index) => {
    button.disabled = count < thresholds[index];
  });
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
const updateButtonText = (
  button: HTMLButtonElement,
  type: string,
  price: number,
  rate: number,
) => {
  button.innerText = `${type} (${rate}/sec, ${price.toFixed(2)} units)`;
};

// Create Purchase Buttons
const purchaseButtonA = document.createElement("button");
updateButtonText(purchaseButtonA, availableItems[0].name, availableItems[0].price, availableItems[0].rate);
purchaseButtonA.disabled = true;
app.append(purchaseButtonA);

const purchaseButtonB = document.createElement("button");
updateButtonText(purchaseButtonB, availableItems[1].name, availableItems[1].price, availableItems[1].rate);
purchaseButtonB.disabled = true;
app.append(purchaseButtonB);

const purchaseButtonC = document.createElement("button");
updateButtonText(purchaseButtonC, availableItems[2].name, availableItems[2].price, availableItems[2].rate);
purchaseButtonC.disabled = true;
app.append(purchaseButtonC);

const purchaseButtonD = document.createElement("button");
updateButtonText(purchaseButtonD, availableItems[3].name, availableItems[3].price, availableItems[3].rate);
purchaseButtonD.disabled = true;
app.append(purchaseButtonD);

const purchaseButtonE = document.createElement("button");
updateButtonText(purchaseButtonE, availableItems[4].name, availableItems[4].price, availableItems[4].rate);
purchaseButtonE.disabled = true;
app.append(purchaseButtonE);

// Purchase Event Listeners
const setupPurchaseListener = (button: HTMLButtonElement, item: Item) => {
  button.addEventListener("click", () => {
 if (count >= item.price) {
   count -= item.price;
   growthRate += item.rate;
   item.price *= 1.15;
   updateButtonText(button, item.name, item.price, item.rate);
   updateDisplays();

   // Display the item description at the top for 10 seconds
   descriptionDiv.innerText = item.description;
   descriptionDiv.style.visibility = "visible";

   // Set a timeout to hide the description after 10 seconds
   setTimeout(() => {
     descriptionDiv.style.visibility = "hidden"; 
   }, 10000);
 }
  });
};

setupPurchaseListener(purchaseButtonA, availableItems[0]);
setupPurchaseListener(purchaseButtonB, availableItems[1]);
setupPurchaseListener(purchaseButtonC, availableItems[2]);
setupPurchaseListener(purchaseButtonD, availableItems[3]);
setupPurchaseListener(purchaseButtonE, availableItems[4]);

// Update function to refresh display
const updateDisplays = () => {
  incrementCounter(0);
  honeyDiv.innerText = availableItems.map((item, index) => `${item.name} ${index}`).join(', ');
  growthRateDiv.innerText = `Growth Rate: ${growthRate.toFixed(1)} bears/sec`;
};

// Append all elements to the container
app.append(
  header,
  countDiv,
  bearButton,
  purchaseButtonA,
  purchaseButtonB,
  purchaseButtonC,
  purchaseButtonD,
  purchaseButtonE,
  honeyDiv,
  growthRateDiv,
  );
  