var runningAlert = require('../../alerts/runningAlert');
var plainExec = require('../execs/plainExec');
function down_skip(data, extractorOptions) {
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
    if (data.options == 'unlisted') {
        swalSet.icon = 'info';
        swalSet.title = 'Site not covered yet';
        swalSet.text =
            'Please forward the name of the site so it can be added. Meanwhile you can try running it through a generic extractor.';
    }
    Swal.fire(swalSet);
}
function dataParse(data, extractorOptions) {
    return new Promise(function (res) {
        if (data.URL.indexOf('itv.com/hub') >= 0) {
            extractorOptions.maxBuffer = 1024 * 30720;
        }
        res(data);
    });
}
module.exports = down_skip;
//# sourceMappingURL=down_skip.js.map