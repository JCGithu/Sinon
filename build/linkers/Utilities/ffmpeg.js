var FFmpegStatic = require('ffmpeg-static-electron');
var ffmpeg = require('fluent-ffmpeg');
var extractorPath = path.join(__dirname, '/../../engine/dist/extractor');
var ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);
var extractorOptions = {
    "cwd": extractorPath,
};
var ffmpegOptions = {
    "cwd": ffmpegPath,
};
//# sourceMappingURL=ffmpeg.js.map