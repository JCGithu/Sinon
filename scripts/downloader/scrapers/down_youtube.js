var runningAlert = require('../../alerts/runningAlert');
var errorAlert = require('../../alerts/errorAlert');
var successAlert = require('../../alerts/successAlert');
var execFile = require('child_process').execFile;
var swalInfo = {
    input: 'select',
    backdrop: swalColour.loading,
    target: document.getElementById('swalframe')
};
function down_youtube(data, extractorOptions) {
    if (data.URL.indexOf('&list=') >= 0) {
        console.log('Playlist found');
        Swal.fire(Object.assign({
            title: 'Playlist URL',
            text: 'Seems like this URL is part of a playlist, do you want to download the whole playlist?',
            showCancelButton: true,
            input: 'select',
            inputOptions: {
                no: 'No',
                yes: 'Why yes!'
            },
            confirmButtonText: 'Single Video',
            cancelButtonText: 'Playlist'
        }, swalInfo)).then(function (result) {
            if (result.value == 'no') {
                data.URL = data.URL.replace(/&list=.*/g, '');
            }
            run_youtube(data, extractorOptions);
        });
    }
    else {
        run_youtube(data, extractorOptions);
    }
}
function run_youtube(data, extractorOptions) {
    Swal.fire(Object.assign({
        icon: 'success',
        title: 'Video found!',
        text: 'Nice one, now click download to grab this clip',
        inputOptions: {
            normal: 'Normal Resolution',
            high: 'High Resolution',
            live: 'Grab .m3u8 Code'
        },
        inputPlaceholder: 'Select Quality',
        showCancelButton: true,
        confirmButtonText: 'Download',
        showLoaderOnConfirm: true,
        preConfirm: function (dlquality) {
            var quals = ['normal', 'high', 'live'];
            var _loop_1 = function (i) {
                if (dlquality == quals[i]) {
                    runningAlert();
                    data.options = quals[i];
                    execFile(versionInfo.ExtractorSet, [data.URL, data.path, data.options, data.proxy, versionInfo.ffmpegPath, data.instaUse, data.instaPass], extractorOptions, function (error, stdout) {
                        if (error) {
                            errorAlert(error, 'download', '');
                        }
                        else {
                            console.log(stdout);
                            successAlert(quals[i], stdout);
                        }
                    });
                }
            };
            for (var i = 0; i < quals.length; i++) {
                _loop_1(i);
            }
        }
    }, swalInfo));
}
module.exports = down_youtube;
//# sourceMappingURL=down_youtube.js.map