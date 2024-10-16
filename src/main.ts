import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "jasmine liang";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
//displayed in button
button.innerText = "🐻";
app.append(button);

let count: number = 0;
const countDiv = document.createElement("div");
countDiv.innerText = `${count.toFixed(6)} bears`;

app.append(countDiv);
button.addEventListener("click", () => {
  incrementCounter(1);
});

// Make a new function called incrementCount
const incrementCounter = (amount: number) => {
  count += amount;
  // If theres one bear set as that statement for proper grammar
  if (count != 1) {
    countDiv.innerText = `${count} bears`;
  } else {
    countDiv.innerText = `${count} bear`;
  }
};

/// Animation frame function to increment counter smoothly
let lastUpdateTime = performance.now();

const animate = (time: number) => {
  const elapsedTime = (time - lastUpdateTime) / 1000; // Calculate the time elapsed in seconds
  lastUpdateTime = time;

  incrementCounter(elapsedTime); // Increment counter by time-dependent amount
  requestAnimationFrame(animate); // Request the next frame
};

// Start the animation loop
requestAnimationFrame(animate);

// Append elements to app container
app.append(header, button, countDiv);
