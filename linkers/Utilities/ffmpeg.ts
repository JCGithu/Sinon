const FFmpegStatic = require('ffmpeg-static-electron');
var ffmpeg = require('fluent-ffmpeg');
var extractorPath = path.join(__dirname, '/../../engine/dist/extractor');
var ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const extractorOptions = {
    "cwd": extractorPath,
};
const ffmpegOptions = {
    "cwd": ffmpegPath,
};
