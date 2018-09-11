const electron = require("electron")
const request = require("request")
const jsdom = require("jsdom")
//const shell = electron.shell
const ipc = electron.ipcRenderer
let epser = [];

let sendEpisode = (current,index) => {
    ipc.sendToHost("setEp", {current:current, index:index});
}

ipc.on("retPrevNext", (e, index)=> {
    if (epser[index]) {
        ipc.sendToHost("setEp", {current:{src:epser[index].getElementsByTagName("a")[0].href, title:epser[index].getElementsByTagName("a")[0].innerHTML}, index});
    }
});

let loopedRequest = async (anime,x,max) => {
    request(`http://anilinkz.to/${anime}?page=${x}`, (err, res, body) => {
        body = new jsdom.JSDOM(body).window.document;
        epser = Array.from(body.getElementsByClassName("epser"));
        epser.forEach((element, index) => {
            episodes.innerHTML = `<div class="epTile" id="${element.getElementsByTagName("a")[0].innerHTML}" onclick="sendEpisode({src:'${element.getElementsByTagName("a")[0].href}', title:'${element.getElementsByTagName("a")[0].innerHTML}'}, ${index})">${element.getElementsByTagName("a")[0].innerHTML}</div>\n${episodes.innerHTML}`;
        });

        if (x<max) {
            loopedRequest(anime,x+1,max);
        } else {
            loading.setAttribute("style", loading.getAttribute("style").replace("fixed", "none"));
        }
    });
}

const select = (anime) => {
    episodes.innerHTML = "";
    request(`http://anilinkz.to/${anime}`, async (err, res, body) => {
        let max = parseInt(body.match(/pages: (\d+)/)[1]);
        loopedRequest(anime,1,max);
        loading.setAttribute("style", loading.getAttribute("style").replace("none", "fixed"));
        episodes.style.display = "block";
        episodes.style.opacity = "1";
        results.style.opacity = "0";
        setTimeout(()=> {
            results.style.display = "none";
        },500);
    });
}

const search = () => {
    results.innerHTML = '';
    loading.setAttribute("style", loading.getAttribute("style").replace("none", "fixed"));
    request(`http://anilinkz.to/search?q=${searchInp.value.split(" ").join("+")}`, (err, res, body) => {
        body = new jsdom.JSDOM(body).window.document;
        results.innerHTML = '';
        Array.from(body.getElementById("seariessearchlist").getElementsByTagName("li")).forEach(element=> {
            const title = element.getElementsByTagName("a")[0].title
            const image = element.getElementsByClassName("img")[0].style.backgroundImage.replace("url(", "http://anilinkz.to/").replace(")", "")
            const href = element.getElementsByTagName("a")[0].href
            results.innerHTML = `${results.innerHTML}\n<table class="aniTile" onclick="select('${href}')"><tr><td><img src="${image}"></td><td><div id="title">${title}</div></td></tr></table>`
        });
        loading.setAttribute("style", loading.getAttribute("style").replace("fixed", "none"));
        results.style.display = "block";
        results.style.opacity = "1";
        episodes.style.opacity = "0";
        setTimeout(()=> {
            episodes.style.display = "none";
        },500);
    })
}

searchInp.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        search();
    }
});


searchBtn.addEventListener("click", () => {
    search();
});
    
    
    
    /*request(`http://api.jikan.moe/v3/search/anime?q="${searchInp.value}"`, (err, res, body) => {
        body = JSON.parse(body);

        body.results.forEach(result => {
            results.innerHTML = `${results.innerHTML}\n<div class="aniTile" id="${result.mal_id}" onclick="select(${result.mal_id})"><div><img id="image" src="${result.image_url}"></div><div><div id="title">${result.title}</div><div id="score">Score ${result.score}</div><div id="eps">Episodes ${result.episodes ? result.episodes : "?"}</div></div></div>`
        });
    });
    */

results.style.height=`${window.innerHeight-60}px`
episodes.style.height=`${window.innerHeight-60}px`
loading.style.top = `${(window.innerHeight-60)/2}px`
window.addEventListener("resize", () => {
    results.style.height=`${window.innerHeight-60}px`
    episodes.style.height=`${window.innerHeight-60}px`
    loading.style.top = `${(window.innerHeight-60)/2}px`
});