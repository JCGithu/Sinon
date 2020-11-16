const { remote, ipcRenderer } = require('electron');
const Swal = require('sweetalert2');
const { app, dialog } = require('electron').remote;
const { execFile } = require('child_process');
const spawn = require('child_process').spawn;
const stream = require('stream');
const {promisify} = require('util');
const got = require('got');
const gifsicle = require('gifsicle');

const win = remote.getCurrentWindow();
const fs = require('fs');
const fspromises = require('fs').promises;
const path = require('path');
const storage = require('electron-json-storage');
const rimraf  = require("rimraf");
const anime = require('animejs');

const FFmpegStatic = require('ffmpeg-static-electron');
const ffmpeg = require('fluent-ffmpeg');
const extractorPath = path.join(__dirname, '/../engine/dist/extractor');
const ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const extractorOptions = {
    "cwd": extractorPath,
};
const ffmpegOptions = {
    "cwd": ffmpegPath,
};

const versionInfo = {
    OS: '',
    ExtractorSet: '',
    ffmpegSet: '',
    ffmpegPath: ffmpegPath,
    extractorPath: extractorPath
}

if (navigator.appVersion.indexOf("Win")!=-1){
    versionInfo.OS="Windows";
    versionInfo.ExtractorSet='extractor';
    versionInfo.ffmpegSet='ffmpeg'
};

if (navigator.appVersion.indexOf("Mac")!=-1){
    versionInfo.OS="MacOS";
    versionInfo.ExtractorSet='./extractor';
    versionInfo.ffmpegSet='./ffmpeg';
};

if (navigator.appVersion.indexOf("X11")!=-1){
    versionInfo.OS="UNIX";
    versionInfo.ExtractorSet='extractor';
    versionInfo.ffmpegSet='';
};

if (navigator.appVersion.indexOf("Linux")!=-1){
    versionInfo.OS="Linux";
    versionInfo.ExtractorSet='extractor';
    versionInfo.ffmpegSet='';
};