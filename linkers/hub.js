const os = require('os');
const storage = require('electron-json-storage');
const { execFile } = require('child_process');
const { remote } = require('electron');
var spawn = require('child_process').spawn;
const path = require("path");

//FFMPEG, GIF, IPLAYER SET UP
const FFmpegStatic = require('ffmpeg-static-electron');
var ffmpeg = require('fluent-ffmpeg');
const gifsicle = require('gifsicle');
var extractorPath = path.join(__dirname, '/../engine/dist/extractor');
var ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);
console.log('ffmpeg binary location: ')
console.log(ffmpegPath)

//VARIABLE SETS
win = remote.getCurrentWindow();
var extractorOptions = {
    "cwd": extractorPath,
};
var ffmpegOptions = {
    "cwd": ffmpegPath,
};
var OSName
var ExtractorSet
var [swalFail, swalLoading, swalPass] = ['#232323','#2C3E50','#2C3E50'];
var effectFile

//OS CHECK
function OScheck(){
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows", ExtractorSet='extractor', ffmpegSet='ffmpeg';
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS", ExtractorSet='./extractor', ffmpegSet='./ffmpeg';
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX", ExtractorSet='extractor';
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux", ExtractorSet='extractor';
    lineBreak();
    console.log('And the OS is...')
    console.log(OSName)
    lineBreak();
}
OScheck();

//LINE AND COLOUR FUNCTIONS

function lineBreak(){
    console.log('~=~=~=~=~=~=~=~=~=~=~=~')
}
function swalColours(){
    if (document.getElementById('darkswitch').checked) {
        var swalFail = '#232323';
        var swalLoading = '#2c3e50';
        var swalPass = '#2c3e50';
    } else {
        var swalFail = '#ED6A5A';
        var swalLoading = 'rgba(0,0,0,0.4)';
        var swalPass = '#30bced';
    }
}
function pythonFail(error){
    console.log(error);
    Swal.fire({
        icon: 'error',
        title: "Downloader Error!",
        text: "Something went wrong. Please send error code and info.",
        backdrop: swalFail,
        toast:false,
        customClass: 'swal-size-sm',
        target: document.getElementById('swalframe'),
        showCancelButton: true,
        confirmButtonText: 'Copy Error Code',
        preConfirm: () => {
            copyStringToClipboard(error);
        },
    });
}
function effectFail(error){
    console.log(error);
    Swal.fire({
        icon: 'error',
        title: "Effect Error!",
        text: "Something went wrong. Please send error code and info.",
        backdrop: swalFail,
        toast:false,
        customClass: 'swal-size-sm',
        target: document.getElementById('swalframe'),
        showCancelButton: true,
        confirmButtonText: 'Copy Error Code',
        preConfirm: () => {
            copyStringToClipboard(error);
        },
    });
}
function copyStringToClipboard (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Clipboard updated')
    lineBreak();
}