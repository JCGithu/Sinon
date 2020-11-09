"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionInfo = exports.ffmpegOptions = exports.extractorOptions = exports.ffmpegPath = exports.extractorPath = exports.ffmpeg = exports.FFmpegStatic = void 0;
var utils_1 = require("./utils");
exports.FFmpegStatic = require('ffmpeg-static-electron');
exports.ffmpeg = require('fluent-ffmpeg');
exports.extractorPath = utils_1.path.join(__dirname, '/../../engine/dist/extractor');
exports.ffmpegPath = exports.FFmpegStatic.path;
exports.ffmpeg.setFfmpegPath(exports.ffmpegPath);
exports.extractorOptions = {
    "cwd": exports.extractorPath,
};
exports.ffmpegOptions = {
    "cwd": exports.ffmpegPath,
};
exports.versionInfo = {
    OS: '',
    ExtractorSet: '',
    ffmpegSet: '',
    ffmpegPath: exports.ffmpegPath,
    extractorPath: exports.extractorPath
};
if (navigator.appVersion.indexOf("Win") != -1) {
    exports.versionInfo.OS = "Windows";
    exports.versionInfo.ExtractorSet = 'extractor';
    exports.versionInfo.ffmpegSet = 'ffmpeg';
}
;
if (navigator.appVersion.indexOf("Mac") != -1) {
    exports.versionInfo.OS = "MacOS";
    exports.versionInfo.ExtractorSet = './extractor';
    exports.versionInfo.ffmpegSet = './ffmpeg';
}
;
if (navigator.appVersion.indexOf("X11") != -1) {
    exports.versionInfo.OS = "UNIX";
    exports.versionInfo.ExtractorSet = 'extractor';
    exports.versionInfo.ffmpegSet = '';
}
;
if (navigator.appVersion.indexOf("Linux") != -1) {
    exports.versionInfo.OS = "Linux";
    exports.versionInfo.ExtractorSet = 'extractor';
    exports.versionInfo.ffmpegSet = '';
}
;
