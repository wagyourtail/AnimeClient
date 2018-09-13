const electron = require("electron")
const ipc = electron.ipcRenderer



document.addEventListener("DOMContentLoaded", () => {
let sources = [];
try {
Array.from(document.getElementById("sources").getElementsByTagName("a")).forEach(src => {
        sources.push({site:src.innerHTML, src:src.href})
});
ipc.sendToHost("srcList", sources);

try {
        ipc.sendToHost("currentSrc", {src:document.getElementById("player").getElementsByTagName("iframe")[0].src, name:document.getElementById("sources").getElementsByTagName("a")[0].innerHTML})
} catch(e) {
        ipc.sendToHost("currentSrc", {src:"./noIframe.html", name:""})
}
} catch (e) {
        ipc.sendToHost("srcList", []);
        ipc.sendToHost("currentSrc", {src:"./noSources.html", name:""})
}
document.removeChild(document.documentElement);
});