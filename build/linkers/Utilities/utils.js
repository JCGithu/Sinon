"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.docReady = exports.progressBar = exports.lineBreak = exports.swalColours = exports.copyString = exports.storage = exports.path = exports.fs = exports.win = exports.ipcRenderer = exports.remote = exports.app = void 0;
exports.app = (_a = require('electron'), _a.app), exports.remote = _a.remote, exports.ipcRenderer = _a.ipcRenderer;
console.log('wahuha ' + exports.app);
exports.win = exports.remote.getCurrentWindow();
exports.fs = require('fs');
exports.path = require('path');
exports.storage = require('electron-json-storage');
function copyString(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    //el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Clipboard updated');
    lineBreak();
}
exports.copyString = copyString;
;
function swalColours() {
    var darkSwitch = document.getElementById('darkswitch');
    if (darkSwitch.checked) {
        var swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50' };
        return swalColour;
    }
    else {
        var swalColour = { fail: '#ED6A5A', loading: 'rgba(0,0,0,0.4)', pass: '#30bced' };
        return swalColour;
    }
}
exports.swalColours = swalColours;
;
function lineBreak() {
    console.log('~=~=~=~=~=~=~=~=~=~=~=~');
}
exports.lineBreak = lineBreak;
;
function progressBar(progress, format) {
    if (progress.percent === undefined) {
        document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
    }
    else {
        if (format.indexOf('concat') >= 0) {
            progress.percent = (progress.percent / (effectFile.length + 1));
        }
        if (progress.percent > 100) {
            progress.percent = 99.90;
        }
        document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
        console.log('Processing: ' + progress.percent + '% done');
        var percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
        exports.win.setProgressBar(percentage);
    }
}
exports.progressBar = progressBar;
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    }
    else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
exports.docReady = docReady;
;
