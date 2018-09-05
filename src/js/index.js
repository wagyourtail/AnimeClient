



// ---- WindowControls ---- //

minBtn.addEventListener("click", () => {remote.BrowserWindow.getFocusedWindow().minimize()});
maxBtn.addEventListener("click", () => {
    let fullscreen = remote.BrowserWindow.getFocusedWindow().isFullScreen();
    remote.BrowserWindow.getFocusedWindow().setFullScreen(!fullscreen);
    topbar.setAttribute("style", fullscreen ? "height: 20px;" : "");
    title.setAttribute("style", fullscreen ? "-webkit-app-region: drag;" : "");
    imageview.setAttribute("style", fullscreen ? "margin-top: 20px;" : "")
    imageviewLoad.style.height= `${fullscreen ? window.innerHeight-20 : window.innerHeight}px`
});
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
    if (searchPanel.style.width != `0px`) {
        searchPanel.style.width = `${maincontent.clientWidth}px`;
    }
});

searchBtn.addEventListener("click", () => {
    if (searchPanel.style.width == `0px`) {
        searchPanel.style.width = `${maincontent.clientWidth}px`;
    } else {
        searchPanel.style.width = `0px`;
    }
});