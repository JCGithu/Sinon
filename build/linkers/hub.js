"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require('os');
var storage = require('electron-json-storage');
var execFile = require('child_process').execFile;
var fs = require('fs');
var _a = require('electron'), remote = _a.remote, ipcRenderer = _a.ipcRenderer;
var path = require("path");
var setNonEnumerableProperties = require('got').setNonEnumerableProperties;
var fstat = require("fs").fstat;
var Buffer = require('buffer').Buffer;
//FFMPEG, GIF, IPLAYER SET UP
var FFmpegStatic = require('ffmpeg-static-electron');
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
var _b = require('./Utilities/utils'), copyString = _b.copyString, lineBreak = _b.lineBreak, swalColours = _b.swalColours;
//# sourceMappingURL=hub.js.map