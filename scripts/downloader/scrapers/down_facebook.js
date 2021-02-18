var plainExec = require('../execs/plainExec');
var execFile = require('child_process').execFile;
var runningAlert = require('../../alerts/runningAlert');
var successAlert = require('../../alerts/successAlert');
var errorAlert = require('../../alerts/errorAlert');
function down_facebook(data, extractorOptions) {
    var swalSet = {
        icon: 'success',
        title: 'Video found!',
        showCancelButton: true,
        confirmButtonText: 'Download',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        preConfirm: function () {
            runningAlert();
            dataParse(data, extractorOptions).then(function (data) {
                data.options = 'normal';
                plainExec(data, extractorOptions);
            });
        }
    };
    if (data.URL.indexOf('live') >= 0) {
        swalSet.icon = 'info';
        swalSet.title = 'Livestream found';
        swalSet.text = 'Copy .m3u8 code?';
        data.options = 'live';
        swalSet.preConfirm = function () {
            execFile(versionInfo.ExtractorSet, [data.URL, data.path, data.options, data.proxy, versionInfo.ffmpegPath, data.instaUse, data.instaPass], extractorOptions, function (error, stdout) {
                if (error) {
                    errorAlert(error, 'download', '');
                }
                else {
                    console.log(stdout);
                    successAlert(quals[i], stdout);
                }
            });
        };
    }
    Swal.fire(swalSet);
}
module.exports = down_facebook;
//# sourceMappingURL=down_facebook.js.map