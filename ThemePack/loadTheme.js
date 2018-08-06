module.exports.load = (document, plugin) => {
    if (plugin == "index") {
        document.getElementById("theme").setAttribute("href", "../../ThemePack/index.css");
    } else {
        document.getElementById("pluginTheme").setAttribute("href", "../../ThemePack/index.css");
    }
}