var execFile = require('child_process').execFile;
var successAlert = require('../../alerts/successAlert');
var errorAlert = require('../../alerts/errorAlert');
var lineBreak = require('../../utilities/utils').lineBreak;
function plainExec(data, extractorOptions) {
    execFile(versionInfo.ExtractorSet, [
        data.URL,
        data.path,
        data.options,
        data.proxy,
        versionInfo.ffmpegPath,
        data.instaUse,
        data.instaPass,
    ], extractorOptions, function (error, stdout) {
        if (error) {
            errorAlert(error + stdout, 'download', '');
        }
        else {
            console.log(stdout);
            if (data.URL.indexOf('twitter.com') >= 0) {
                successAlert('', 'Please note: Twitter videos are named after the username! Some tweets are just too long for titles.');
            }
            else {
                successAlert();
            }
        }
        lineBreak();
    });
}
module.exports = plainExec;
//# sourceMappingURL=plainExec.js.map