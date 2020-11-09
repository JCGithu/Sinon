"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorAlert = void 0;
var utils_1 = require("../Utilities/utils");
var sweetalert2_1 = require("sweetalert2");
function errorAlert(error, errorType, errorText, swalColour, instaDeets) {
    var instaUse = document.getElementById('InstaUse');
    var instaPass = document.getElementById('InstaPass');
    error = error.toString().replace(instaPass.value, "").replace(instaUse.value, "");
    console.log(error);
    var swalOptions = {
        icon: 'error',
        backdrop: swalColour.fail,
        text: "Something went wrong. Please send error code and info.",
        toast: false,
        target: document.getElementById('swalframe'),
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Copy Error Code',
        preConfirm: function () {
            utils_1.copyString(error);
        }
    };
    if (errorType == 'download') {
        swalOptions.title = 'Downloader Error!';
    }
    else if (errorType == 'proxy') {
        swalOptions.title = 'Proxy error!';
    }
    else if (errorType == 'effect') {
        swalOptions.title = 'Effect error!';
    }
    else if (errorType == 'convert') {
        swalOptions.title = 'Conversion error!';
    }
    else if (errorType == 'basic') {
        swalOptions.title = 'Error!';
        swalOptions.text = errorText;
        swalOptions.showCancelButton = false;
        delete swalOptions.confirmButtonText;
        delete swalOptions.preConfirm;
    }
    sweetalert2_1.default.fire(swalOptions);
}
exports.errorAlert = errorAlert;
;
module.exports = {
    errorAlert: errorAlert
};
