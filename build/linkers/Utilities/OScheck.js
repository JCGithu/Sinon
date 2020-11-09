var OSName;
var ExtractorSet;
var effectFile;
var ffmpegSet;
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
;
