import "./css/index.css";
let img = document.createElement("img");
img.src = require('./img/1.png').default;
img.style.width = "200px";
img.style.height = "200px";
document.getElementById("root").appendChild(img);