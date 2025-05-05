import handler from "./handler.js";
// const variables = require('./variables'); 

//runtime
document.addEventListener("keydown", (e) => {handler.onKeyEvent(e, true)})
document.addEventListener("keyup", (e) => {handler.onKeyEvent(e, false)})
document.addEventListener("mousedown", () => {handler.onMouseEvent(true)})
document.addEventListener("mouseup", () => {handler.onMouseEvent(false)})
document.addEventListener("mousemove", (m) => {handler.onMouseEvent(m)})

const movement = setInterval(() => {
    handler.updatePlrCoordinate()
}, 1)

