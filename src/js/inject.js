const electron = require("electron")
const ipc = electron.ipcRenderer



document.addEventListener("DOMContentLoaded", () => {
let sources = [];

Array.from(document.getElementById("sources").getElementsByTagName("a")).forEach(src => {
        sources.push({site:src.innerHTML, src:src.href})
});
ipc.sendToHost("srcList", sources);

try {
        ipc.sendToHost("currentSrc", {src:document.getElementById("player").getElementsByTagName("iframe")[0].src, name:document.getElementById("sources").getElementsByTagName("a")[0].innerHTML})
} catch(e) {
        ipc.sendToHost("currentSrc", {src:"./error.html", name:""})
}
document.removeChild(document.documentElement);
});