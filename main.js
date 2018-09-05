const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;
const ipc = require('electron').ipcMain;

let win;


function createWindow() {
    win  = new BrowserWindow({frame:false,width:1440, height:900});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/html/index.html'),
        protocol:'file',
        slashes: true
    }));

    win.webContents.openDevTools();

    
    win.on('closed', () => {
        win = null;
    });
    
    win.webContents.executeJavaScript(`
    sourcesLoad.src = "file:///${path.join(__dirname, 'src/html/sources.html').split("\\").join("/")}";
    searchPanelLoad.src = "file:///${path.join(__dirname, 'src/html/searchPanel.html').split("\\").join("/")}";
    rightbarLoad.src = "file:///${path.join(__dirname, 'src/html/rightbar.html').split("\\").join("/")}";
    `)

    /*
    let menu = Menu.buildFromTemplate([{
        label: 'Menu',
        submenu: [
            {label: 'Adjust Notification Value'},
            {type:'separator'},
            {
                label: 'CoinMarketCap',
                click() {
                    shell.openExternal("http://coinmarketcap.com");
                }
            },
            {type:'separator'},
            {
                label: 'Exit',
                click() {
                    app.quit();
                }
            }
        ]
    }])
    Menu.setApplicationMenu(menu);
    */
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

ipc.on('update-notify-value', (event, arg) => {
    win.webContents.send('targetPriceVal', arg);
});