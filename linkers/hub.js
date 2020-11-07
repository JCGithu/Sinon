const os = require('os');
const storage = require('electron-json-storage');
const { execFile } = require('child_process');
const { remote, ipcRenderer } = require('electron');
const path = require("path");
const { setNonEnumerableProperties } = require('got');
const { fstat } = require("fs");
const { Buffer } = require('buffer');
//FFMPEG, GIF, IPLAYER SET UP
const FFmpegStatic = require('ffmpeg-static-electron');
var ffmpeg = require('fluent-ffmpeg');
var extractorPath = path.join(__dirname, '/../engine/dist/extractor');
var ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);
//VARIABLE SETS
var OSName;
var ExtractorSet;
var effectFile;
//OS CHECK
function OScheck() {
    if (navigator.appVersion.indexOf("Win") != -1)
        OSName = "Windows", ExtractorSet = 'extractor', ffmpegSet = 'ffmpeg';
    if (navigator.appVersion.indexOf("Mac") != -1)
        OSName = "MacOS", ExtractorSet = './extractor', ffmpegSet = './ffmpeg';
    if (navigator.appVersion.indexOf("X11") != -1)
        OSName = "UNIX", ExtractorSet = 'extractor';
    if (navigator.appVersion.indexOf("Linux") != -1)
        OSName = "Linux", ExtractorSet = 'extractor';
}
OScheck();
//LINE AND COLOUR FUNCTIONS
const { copyString, lineBreak, swalColours } = require('./Utilities/utils');
let swalColour = swalColours();
export {};
