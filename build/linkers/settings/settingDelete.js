"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingDelete = void 0;
var Swal = require('sweetalert2');
var successAlert_1 = require("../alerts/successAlert");
var utils_1 = require("../Utilities/utils");
function settingDelete() {
    var swalColour = utils_1.swalColours();
    Swal.fire({
        icon: 'warning',
        title: 'Delete Settings',
        text: 'Are you sure you want to delete the settings?',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: swalColour.loading,
        toast: false,
        target: document.getElementById('swalframe'),
    }).then(function (result) {
        if (result.value) {
            storage.clear(function (error) {
                if (error)
                    throw error;
            });
            console.log('Settings deleted');
            successAlert_1.successAlert('delete', '', swalColour);
        }
        ;
    });
}
exports.settingDelete = settingDelete;
;
module.exports = {
    settingDelete: settingDelete
};
