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
countDiv.innerText = `${count} bears`;

app.append(countDiv);
button.addEventListener("click", () => {
  incrementCounter();
});

// Make a new function called incrementCount
const incrementCounter = () => {
  count += 1;
  // If theres one bear set as that statement for proper grammar
  if (count != 1) {
    countDiv.innerText = `${count} bears`;
  } else {
    countDiv.innerText = `${count} bear`;
  }
};
// Make it so that the counter counts up every second
setInterval(incrementCounter, 1000);

// Append elements to app container
app.append(header, button, countDiv);
