const electron = require("electron")
const ipc = electron.ipcRenderer



document.addEventListener("DOMContentLoaded", () => {
let sources = [];

Array.from(document.getElementById("sources").getElementsByTagName("a")).forEach(src => {
        sources.push({site:src.innerHTML, src:src.href})
});
console.log(sources)
ipc.sendToHost("srcList", sources)


ipc.sendToHost("currentSrc", {src:document.getElementById("player").getElementsByTagName("iframe")[0].src, name:document.getElementById("sources").getElementsByTagName("a")[0].innerHTML})

document.removeChild(document.documentElement);
});