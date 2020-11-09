import { path } from './utils';

export const FFmpegStatic = require('ffmpeg-static-electron');
export const ffmpeg = require('fluent-ffmpeg');
export const extractorPath = path.join(__dirname, '/../../engine/dist/extractor');
export const ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);

export const extractorOptions = {
    "cwd": extractorPath,
};
export const ffmpegOptions = {
    "cwd": ffmpegPath,
};

export const versionInfo = {
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
