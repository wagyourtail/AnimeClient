const electron = require("electron")
const request = require("request")
const jsdom = require("jsdom")
const shell = electron.shell
const ipc = electron.ipcRenderer

sendEpisode = (current,prev,next) => {
    
}


let loopedRequest = async (anime,x,max) => {
    request(`http://anilinkz.to/${anime}?page=${x}`, (err, res, body) => {
        body = new jsdom.JSDOM(body).window.document;

        Array.from(body.getElementsByClassName("epser")).forEach(element => {
            episodes.innerHTML = `<div class="epTile">${element.getElementsByTagName("a")[0].innerHTML}</div>\n${episodes.innerHTML}`;
        });

        if (x<max) {
            loopedRequest(anime,x+1,max);
        }
    });
}

const select = (anime) => {
    episodes.innerHTML = "";
    request(`http://anilinkz.to/${anime}`, async (err, res, body) => {
        let max = parseInt(body.match(/pages: (\d+)/)[1]);
        loopedRequest(anime,1,max);
        episodes.style.display = "block";
        episodes.style.opacity = "1";
        results.style.opacity = "0";
        setTimeout(()=> {
            results.style.display = "none";
        },500);
    });
}


searchBtn.addEventListener("click", () => {
    results.innerHTML = '';
    request(`http://anilinkz.to/search?q=${searchInp.value.split(" ").join("+")}`, (err, res, body) => {
        body = new jsdom.JSDOM(body).window.document;
        Array.from(body.getElementById("seariessearchlist").getElementsByTagName("li")).forEach(element=> {
            const title = element.getElementsByTagName("a")[0].title
            const image = element.getElementsByClassName("img")[0].style.backgroundImage.replace("url(", "http://anilinkz.to/").replace(")", "")
            const href = element.getElementsByTagName("a")[0].href
            results.innerHTML = `${results.innerHTML}\n<table class="aniTile" onclick="select('${href}')"><tr><td><img src="${image}"></td><td><div id="title">${title}</div></td></tr></table>`
        });

        results.style.display = "block";
        results.style.opacity = "1";
        episodes.style.opacity = "0";
        setTimeout(()=> {
            episodes.style.display = "none";
        },500);
    });
    
    
    
    /*request(`http://api.jikan.moe/v3/search/anime?q="${searchInp.value}"`, (err, res, body) => {
        body = JSON.parse(body);

        body.results.forEach(result => {
            results.innerHTML = `${results.innerHTML}\n<div class="aniTile" id="${result.mal_id}" onclick="select(${result.mal_id})"><div><img id="image" src="${result.image_url}"></div><div><div id="title">${result.title}</div><div id="score">Score ${result.score}</div><div id="eps">Episodes ${result.episodes ? result.episodes : "?"}</div></div></div>`
        });
    });
    */
});

results.style.height=`${window.innerHeight-60}px`
episodes.style.height=`${window.innerHeight-60}px`
window.addEventListener("resize", () => {
    results.style.height=`${window.innerHeight-60}px`
    episodes.style.height=`${window.innerHeight-60}px`
});