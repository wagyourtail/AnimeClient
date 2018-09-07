const electron = require("electron");
const remote = electron.remote;


// ---- WindowControls ---- //

minBtn.addEventListener("click", () => {remote.BrowserWindow.getFocusedWindow().minimize()});
maxBtn.addEventListener("click", () => {remote.BrowserWindow.getFocusedWindow().maximize()});
closeBtn.addEventListener("click", window.close);


content.style.height = `${window.innerHeight-20}px`;
leftbar.style.height = `${window.innerHeight-20}px`;
maincontent.style.height = `${window.innerHeight-20}px`;
rightbar.style.height = `${window.innerHeight-20}px`;
searchPanel.style.height = `${window.innerHeight-20}px`;
window.addEventListener("resize", () => {
    content.style.height = `${window.innerHeight-20}px`;
    leftbar.style.height = `${window.innerHeight-20}px`;
    maincontent.style.height = `${window.innerHeight-20}px`;
    rightbar.style.height = `${window.innerHeight-20}px`;
    searchPanel.style.height = `${window.innerHeight-20}px`;
    searchPanelLoad.style.height = `${window.innerHeight-20}px`;
    searchPanelLoad.style.width = `${window.innerWidth-200}px`;
    if (searchPanel.style.width != `0px`) {
        searchPanel.style.width = `${window.innerWidth-200}px`;
    }
});

searchBtn.addEventListener("click", () => {
    if (searchPanel.style.width == `0px`) {
        searchPanel.style.width = `${window.innerWidth-200}px`;
        maincontentInner.style.opacity="0";
    } else {
        searchPanel.style.width = `0px`;
        maincontentInner.style.opacity="1";
    }
});