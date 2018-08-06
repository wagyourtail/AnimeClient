const electron = require("electron");
const fs = require("fs");
const theme = require("../../ThemePack/loadTheme.js");
const remote = electron.remote;
console.log(__dirname);

theme.load(document, "index");

// --- minmaxclose Buttons --- //
const minBtn = document.getElementById("minBtn");

minBtn.addEventListener('click', (event) => {
    remote.BrowserWindow.getFocusedWindow().minimize();
});

const maxBtn = document.getElementById("maxBtn");

maxBtn.addEventListener('click', (event) => {
    remote.BrowserWindow.getFocusedWindow().isMaximized() ? remote.BrowserWindow.getFocusedWindow().unmaximize() : remote.BrowserWindow.getFocusedWindow().maximize();
});


const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener('click', (event) => {
    window.close();
});

// --- plugin load --- //
const mainSidebar = document.getElementById("mainSidebar");

let increaseTo50 = (plugin) => {
    let pl = document.getElementById(plugin);
    let val = parseInt(pl.style.borderRadius.slice(0,2));
    if (val < 50) {
        val++;
        pl.style.borderRadius = `${val}%`;
        setTimeout(()=>{increaseTo50(plugin)}, 10)
    }
}

let decreaseTo25 = (plugin) => {
    let pl = document.getElementById(plugin);
    let val = parseInt(pl.style.borderRadius.slice(0,2));
    if (val > 25) {
        val--;
        pl.style.borderRadius = `${val}%`;
        setTimeout(()=>{decreaseTo25(plugin)}, 10)
    }
}


for (let plugin of fs.readdirSync("./plugins/")) {
    mainSidebar.innerHTML = `<div><img id="${plugin}" class="pluginImage" src="../../plugins/${plugin}/icon.png" width="58" height="58"/></div>\n${mainSidebar.innerHTML}`;
}

Array.from(document.getElementsByClassName("pluginImage")).forEach((element) => {
    element.addEventListener("click", () => {
        Array.from(document.getElementsByClassName("pluginImage")).forEach((ele) => {
            ele.setAttribute("style", "")
        });
        element.setAttribute("style", "border-radius: 25%;")
        activate(element.getAttribute("id"));
    });
});
// --- malSidebar --- //

const malSidebar = document.getElementById("malSidebar");

const malTitle = document.getElementById("malTitle");

malTitle.addEventListener("click", () => {
    
});

const openMAL = document.getElementById("openMAL");

openMAL.addEventListener("click", () => {
    if (malSidebar.style.width == "300px") {
        openMAL.setAttribute("style", "transform: rotate(180deg);");
        malSidebar.style.width = "0px"
    } else {
        openMAL.setAttribute("style", "");
        malSidebar.style.width = "300px";
    }
    
});


// --- load plugin --- //

let activate = (plugin) => {
    let avail = false;
    for (let pl of Array.from(document.getElementsByClassName("pluginContent"))) {
        //console.log(pl);
        if (pl.getAttribute("id") == plugin) {
            avail = true;
            break;
        }
    }
    console.log(avail);
    if (!avail) {
        //console.log(fs.readFileSync(`./plugins/${plugin}/mainContent.html`));
        document.getElementById("mainContent").innerHTML = `${document.getElementById("mainContent").innerHTML}<div class="pluginContent" id="${plugin}">${fs.readFileSync(`./plugins/${plugin}/mainContent.html`)}</div>`;
        require(`../../plugins/${plugin}/mainContent.js`).run();
    }
    document.getElementById("pluginStyle").setAttribute("href", `../../plugins/${plugin}/mainContent.css`);
    theme.load(document, plugin);

    Array.from(document.getElementsByClassName("pluginContent")).forEach((element) => {
        if (element.getAttribute("id") == plugin) {
             element.style.display = "block";
             element.setAttribute("height", (window.innerHeight-24));
        } else {
            element.style.display = "none";
        }
});
}

// --- plugin iframes --- //

window.addEventListener("resize", () => {
    Array.from(document.getElementsByClassName("pluginContent")).forEach(element => {
        element.setAttribute("height", (window.innerHeight-24));
    });
});