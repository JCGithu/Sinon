var fileExec = require('../execs/fileExec');
function down_file(data, extractorOptions) {
    var parsedURL = data.URL.replace(/\\\/|\/\\|\/\/|\\\\/g, '/')
        .replace(':/', '://')
        .replace(':///', '://');
    data.URL = parsedURL;
    var textInput = "<a>Seems like you've put in a direct file url.<br> Would you like to download?</a>";
    Swal.fire({
        icon: 'info',
        title: 'File URL Detected',
        html: textInput,
        showCancelButton: true,
        confirmButtonText: 'Download',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        target: document.getElementById('swalframe'),
        preConfirm: function () {
            fileExec(data);
        }
    });
}
module.exports = down_file;
//# sourceMappingURL=down_file.js.map