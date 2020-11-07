"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var version = require("process").version;
var remote = require('electron').remote;
var dialog = require('electron').remote.dialog;
var win = remote.getCurrentWindow();
var utils_1 = require("./Utilities/utils");
var settingDelete_1 = require("./settings/settingDelete");
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
utils_1.docReady(function () {
    //Frame Style
    document.getElementsByClassName("maindiv")[0].style.borderRadius = "10%";
    //Dark Mode
    var checkbox = document.querySelector('input[name=mode]');
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            trans();
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            trans();
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });
    var trans = function () {
        document.documentElement.classList.add('transition');
        window.setTimeout(function () {
            document.documentElement.classList.remove('transition');
        }, 1000);
    };
    //Close App
    document.getElementById('close').addEventListener('click', function () { win.close(); });
    //Initial Settings Check
    var userData = app.getPath('userData');
    var storage = require('electron-json-storage');
    var storagePath = path.join(userData, '/.');
    storage.setDataPath(storagePath);
    var dataPath = storage.getDataPath();
    storage.has('settings', function (error, data) {
        if (error)
            throw error;
        if (data) {
        }
        else {
            settingSet();
        }
    });
    //Settings Boot Up
    storage.get('settings', function (error, data) {
        if (error)
            throw error;
        var darkSwitch = document.getElementById("darkswitch");
        var urlSwitch = document.getElementById("urlswitch");
        var geoFormat = document.getElementById('geoFormat');
        var downloadFolder = document.getElementById('downloadfolder');
        var insta = {
            username: document.getElementById('InstaUse').value,
            password: document.getElementById('InstaPass').value
        };
        var proxyInput = document.getElementById('proxyInput');
        if (data.DarkMode == true) {
            darkSwitch.checked = true;
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        ;
        if (data.UrlWipe == true) {
            urlSwitch.checked = true;
        }
        ;
        if (data.Geo == 'US') {
            geoFormat.value = "US";
        }
        ;
        if (data.downloadPath) {
            if (data.CustomProxy !== null) {
                proxyInput.value = data.CustomProxy;
            }
            if (data.InstaUse !== null) {
                insta.username = data.InstaUse;
            }
            if (data.InstaPass !== null) {
                insta.password = data.InstaPass;
            }
            if (data.downloadPath !== null) {
                downloadFolder.value = data.downloadPath;
            }
        }
        else {
            downloadFolder.value = '';
            insta.username = '';
            insta.password = '';
            proxyInput.value = '';
        }
    });
    //Auto-Save Settings
    var waitTimer;
    var switches = document.querySelectorAll("#urlswitch, #darkswitch");
    var textSettings = document.querySelectorAll('#proxyInput, #InstaUse, #InstaPass');
    var locals = document.getElementById('geoFormat');
    function autoSave() {
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave, 5000);
    }
    ;
    for (var _i = 0, _a = switches[Symbol.iterator](); _i < _a.length; _i++) {
        var swit = _a[_i];
        swit.addEventListener('click', function () {
            autoSave();
        });
    }
    ;
    for (var _b = 0, _c = textSettings[Symbol.iterator](); _b < _c.length; _b++) {
        var sets = _c[_b];
        sets.addEventListener("keyup", function () {
            autoSave();
        });
    }
    ;
    locals.addEventListener("change", function () {
        autoSave();
    });
    //Settings Delete
    document.getElementById('settingDelete').addEventListener("click", function () {
        settingDelete_1.settingDelete();
    });
    //Console Startup Log
    utils_1.lineBreak();
    console.log('FFmpeg ::: ' + ffmpegPath);
    console.log('OS ::: ' + OSName);
    console.log('Settings file ::: ' + dataPath);
    utils_1.lineBreak();
});
//# sourceMappingURL=settings.js.map