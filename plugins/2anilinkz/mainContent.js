module.exports.run = function() {

    //let axios = require("axios");
    //let axioscloudflare = require("axios-cloudflare")

    //axioscloudflare.use(axios);

    let hideSearch = document.getElementById("hideSearch");
    hideSearch.addEventListener("click", () => {
        let searchResults = document.getElementById("searchResults");
        if (searchResults.style.height == "0px") {
            searchResults.style.height = "200px";
            hideSearch.innerHTML = "hide";
        } else {
            searchResults.style.height = "0px";
            hideSearch.innerHTML = "show";
        }
    });


    let search = (keyword) => {

        for(result of results) {
            let searchResults = document.getElementById("searchResults");
            searchResults.innerHTML = `${searchResults.innerHTML}\n<div class="animeItem" id="${result.link}"><div class="innerAnimeItem" onclick="openAnime('${result.link}')"><img src="${result.icon}" width="100px"><a>${result.title}</a></div></div>`
        }
    }

    let openAnime = (title) => {

    }

}