/**
 * Created by lingchen on 9/23/15.
 */
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    console.log('window-all-closed');
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('will-finish-launching',function(){
    console.log('will-finish-launching');
});

//
app.on('open-file',function(){
    console.log('open-file');

});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    console.log('ready');
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    //mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.loadUrl('file://' + __dirname + '/zeus.html');
    //mainWindow.loadUrl('https://github.com');

    // Open the DevTools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    setMenu();
});

app.on('before-quit',function(){
    console.log('before-quit');
});

app.on('will-quit',function(){
    console.log('will-quit');
});

app.on('quit',function(){
    console.log('quit');
});

app.on('activate',function(){
    console.log('activate');
});

//click docker event
app.on('activate-with-no-open-windows',function(){
    console.log('activate-with-no-open-windows');
});

//set menu for app
var Menu = require('menu');
var MenuItem = require('menu-item');

function buildMenu(items){
    var menu = new Menu();
    for(var i = 0 ; i < items.length; i ++){
        var item = items[i];
        if(item.submenu){
            item.submenu = buildMenu(item.submenu);
        }

        var item = new MenuItem(item);
        menu.append(item);
    }
    return menu;
}

function setMenu(){
    var isMac = process.platform == 'darwin';
    var template = [
        {
            label: 'ZeusPlatform',
            submenu: [
                {
                    label: 'About ZeusPlatform',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ZeusPlatform',
                    accelerator: 'Command+H',
                    selector: 'hide:'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    selector: 'hideOtherApplications:'
                },
                {
                    label: 'Show All',
                    selector: 'unhideAllApplications:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function() { app.quit(); }
                },
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'Command+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+Command+Z',
                    selector: 'redo:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'Command+X',
                    selector: 'cut:'
                },
                {
                    label: 'Copy',
                    accelerator: 'Command+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'Command+V',
                    selector: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:'
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: isMac ? 'Command+R' : 'Ctrl+R',
                    click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+I',
                    click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
                },
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:'
                },
                {
                    label: 'Close',
                    accelerator: 'Command+W',
                    selector: 'performClose:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Bring All to Front',
                    selector: 'arrangeInFront:'
                },
            ]
        },
        {
            label: 'Mode',
            submenu: [
                {
                    label: 'Toggle Fullscreen',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:'
                },
                {
                    label: 'Toggle Presentation',
                    accelerator: 'Command+W',
                    selector: 'performClose:'
                }
            ]
        },
        {
            label: 'Help',
            submenu: []
        },
    ];

    menu = buildMenu(template);

    Menu.setApplicationMenu(menu);
}

