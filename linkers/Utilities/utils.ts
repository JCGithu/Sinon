export const { app, remote, ipcRenderer } = require('electron');

console.log('wahuha '+app);
export const win = remote.getCurrentWindow();
export const fs = require('fs');
export const path = require('path');
export const storage = require('electron-json-storage');

export function copyString (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    //el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Clipboard updated')
    lineBreak();
};

export function swalColours(){
    let darkSwitch = document.getElementById('darkswitch') as HTMLInputElement;
    if (darkSwitch.checked) {
        let swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50'}
        return swalColour
    } else {
        let swalColour = { fail: '#ED6A5A', loading: 'rgba(0,0,0,0.4)', pass: '#30bced'}
        return swalColour
    }
};

export function lineBreak(){
    console.log('~=~=~=~=~=~=~=~=~=~=~=~');
};

export function progressBar(progress: { percent: number; timemark: any; }, format){
    if (progress.percent === undefined){
        document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
    } else {
        if (format.indexOf('concat')>=0) {
            progress.percent = (progress.percent / (effectFile.length + 1));
        }
        if (progress.percent > 100) {
            progress.percent = 99.90
        }
        document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
        console.log('Processing: ' + progress.percent + '% done');
        let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
        win.setProgressBar(percentage);
    }
}

export function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};