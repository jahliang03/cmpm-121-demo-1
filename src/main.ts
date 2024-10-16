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

button.addEventListener('click', () => {
    alert('Button was clicked!');
});
