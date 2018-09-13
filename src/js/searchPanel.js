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

let loopedRequest = (anime,x,max) => {
    return new Promise((resolve, reject) => {
        request(`http://anilinkz.to/${anime}?page=${x}`, (err, res, body) => {
            body = new jsdom.JSDOM(body).window.document;
            let arr = Array.from(body.getElementsByClassName("epser"));
            if (x<max) {
                loopedRequest(anime,x+1,max).then((a) => {
                    resolve(arr.concat(a));
                });
            } else {
                resolve(arr);
            }
        });
    });
}

const select = (anime) => {
    anilinkzEpisodes.innerHTML = "";
    anilinkzResults.style.opacity = "0";
    setTimeout(()=> {
        anilinkzResults.style.display = "none";
    },500);
    anilinkzLoading.setAttribute("style", anilinkzLoading.getAttribute("style").replace("none", "fixed"));
    request(`http://anilinkz.to/${anime}`, async (err, res, body) => {
        let max = parseInt(body.match(/pages: (\d+)/)[1]);
        loopedRequest(anime,1,max).then((arr) => {
            epser = arr;
            epser.forEach((element, index) => {
                if (!document.getElementById(element.getElementsByTagName("a")[0].innerHTML)) {
                    anilinkzEpisodes.innerHTML = `<div class="epTile" id="${element.getElementsByTagName("a")[0].innerHTML}" onclick="sendEpisode({src:'${element.getElementsByTagName("a")[0].href}', title:'${element.getElementsByTagName("a")[0].innerHTML}'}, ${index})">${element.getElementsByTagName("a")[0].innerHTML}</div>\n${anilinkzEpisodes.innerHTML}`;
                } 
            });
            anilinkzLoading.setAttribute("style", anilinkzLoading.getAttribute("style").replace("fixed", "none"));
        }).catch(console.log);
        
        anilinkzEpisodes.style.display = "block";
        anilinkzEpisodes.style.opacity = "1";
    });
}

const search = () => {
    anilinkzResults.innerHTML = '';
    anilinkzEpisodes.style.opacity = "0";
    setTimeout(()=> {
        anilinkzEpisodes.style.display = "none";
    },500);
    anilinkzLoading.setAttribute("style", anilinkzLoading.getAttribute("style").replace("none", "fixed"));
    request(`http://anilinkz.to/search?q=${searchInp.value.split(" ").join("+").toLowerCase()}`, (err, res, body) => {
        body = new jsdom.JSDOM(body).window.document;
        anilinkzResults.innerHTML = '';
        Array.from(body.getElementById("seariessearchlist").getElementsByTagName("li")).forEach(element=> {
            const title = element.getElementsByTagName("a")[0].title
            const image = element.getElementsByClassName("img")[0].style.backgroundImage.replace("url(", "http://anilinkz.to/").replace(")", "")
            const href = element.getElementsByTagName("a")[0].href
            anilinkzResults.innerHTML = `${anilinkzResults.innerHTML}\n<table class="serTile" onclick="select('${href}')"><tr><td><img src="${image}"></td><td><div id="title">${title}</div></td></tr></table>`
        });
        anilinkzLoading.setAttribute("style", anilinkzLoading.getAttribute("style").replace("fixed", "none"));
        anilinkzResults.style.display = "block";
        anilinkzResults.style.opacity = "1";
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
    
    
    
    // request(`http://api.jikan.moe/v3/search/anime?q="${searchInp.value}"`, (err, res, body) => {
    //     body = JSON.parse(body);

    //     body.anilinkzResults.forEach(result => {
    //         anilinkzResults.innerHTML = `${anilinkzResults.innerHTML}\n<div class="aniTile" id="${result.mal_id}" onclick="select(${result.mal_id})"><div><img id="image" src="${result.image_url}"></div><div><div id="title">${result.title}</div><div id="score">Score ${result.score}</div><div id="eps">anilinkzEpisodes ${result.anilinkzEpisodes ? result.anilinkzEpisodes : "?"}</div></div></div>`
    //     });
    // });

content.style.height = `${window.innerHeight-70}px`
window.addEventListener("resize", () => {
    content.style.height = `${window.innerHeight-70}px`
});