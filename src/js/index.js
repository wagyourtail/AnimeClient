const electron = require("electron")
const fs = require("fs")
const remote = electron.remote;
let SRCnow = "";
let prefSite = {site:"", index:0};
let retNext = () => {
    searchPanelLoad.send("retPrevNext", 0)
}

let retPrev = () => {
    searchPanelLoad.send("retPrevNext", 0)
}

let changeSrc = (src) => {
    prefSite = {site:"", index:0};
    silentLoad.src = src
    SRCnow = src
}

searchPanelLoad.addEventListener("ipc-message", (m) => {
    if (m.channel == "setEp") {
        let {current, index} = m.args[0]
        retPrev = () => {
            searchPanelLoad.send("retPrevNext", index+1)
        }
        retNext = () => {
            searchPanelLoad.send("retPrevNext", index-1)
        }    
        
        contentTitle.innerHTML = current.title
        SRCnow = `https://anilinkz.to${current.src}`
        silentLoad.src = `https://anilinkz.to${current.src}`
        searchPanel.style.width = `0px`
        maincontentInner.style.opacity="1"
    }
});

silentLoad.addEventListener("dom-ready", () => {
    silentLoad.setAudioMuted(true)
})

silentLoad.addEventListener("ipc-message", (m) => {
    if (m.channel == "srcList") {
        sources.innerHTML = ""
        for (let a = 0; a < m.args[0].length; a++) {
            sources.innerHTML = `${sources.innerHTML}\n<div class="${SRCnow == m.args[0][a].src ? "current" : "select"}" id="${m.args[0][a].src}" onclick="${SRCnow == m.args[0][a].src ? "//" : ""}changeSrc('${m.args[0][a].src}')">${m.args[0][a].site}</div>`;
        }
        if (prefSite.site && !(document.getElementsByClassName("current")[0].innerHTML == prefSite.site)) {
            let src = Array.from(document.getElementsByClassName("select")).filter(element => {
                return element.innerHTML == prefSite.site;
            });
            if (src) {
                changeSrc(src[prefSite.index] ? src[prefSite.index].id : src[0].id);
            }
        } else if (!prefSite.site){
            const site = document.getElementsByClassName("current")[0].innerHTML;
            const index = Array.from(sources.getElementsByTagName("div")).filter(element => {
                return element.innerHTML == site;
            }).findIndex(element => {
                return element.getAttribute("class") == "current";
            });
            prefSite = {site:site, index:index};
        }
    } else if (m.channel == "currentSrc") {
        contentSrc.src = m.args[0].src;
    } else {
        console.log(m)
    }
})



// ---- WindowControls ---- //

minBtn.addEventListener("click", () => {remote.BrowserWindow.getFocusedWindow().minimize()})
maxBtn.addEventListener("click", () => {remote.BrowserWindow.getFocusedWindow().maximize()})
closeBtn.addEventListener("click", window.close);


content.style.height = `${window.innerHeight-20}px`
leftbar.style.height = `${window.innerHeight-20}px`
maincontent.style.height = `${window.innerHeight-20}px`
rightbar.style.height = `${window.innerHeight-20}px`
rightbarLoad.style.height = `${window.innerHeight-20}px`
searchPanel.style.height = `${window.innerHeight-20}px`
window.addEventListener("resize", () => {
    content.style.height = `${window.innerHeight-20}px`
    leftbar.style.height = `${window.innerHeight-20}px`
    maincontent.style.height = `${window.innerHeight-20}px`
    rightbar.style.height = `${window.innerHeight-20}px`
    searchPanel.style.height = `${window.innerHeight-20}px`
    searchPanelLoad.style.height = `${window.innerHeight-20}px`
    searchPanelLoad.style.width = `${window.innerWidth-200}px`
    rightbarLoad.style.height = `${window.innerHeight-20}px`
    if (searchPanel.style.width != `0px`) {
        searchPanel.style.width = `${window.innerWidth-200}px`
    }
});

searchBtn.addEventListener("click", () => {
    if (searchPanel.style.width == `0px`) {
        searchPanel.style.width = `${window.innerWidth-200}px`
        maincontentInner.style.opacity="0"
    } else {
        searchPanel.style.width = `0px`
        maincontentInner.style.opacity="1"
    }
});