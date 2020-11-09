"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingSet = exports.settingSave = exports.settingDelete = void 0;
var Swal = require('sweetalert2');
var utils_1 = require("../Utilities/utils");
var successAlert_1 = require("../alerts/successAlert");
var utils_2 = require("../Utilities/utils");
function settingDelete() {
    var swalColour = utils_2.swalColours();
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
            utils_1.storage.clear(function (error) {
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
function settingSave() {
    var URLSwitch = document.getElementById('urlswitch');
    var darkSwitch = document.getElementById('darkswitch');
    var geoFormat = document.getElementById('geoFormat');
    var proxyInput = document.getElementById('proxyInput');
    var InstaUse = document.getElementById('InstaUse');
    var InstaPass = document.getElementById('InstaPass');
    var downloadfolder = document.getElementById('downloadfolder');
    utils_1.storage.set('settings', {
        UrlWipe: URLSwitch.checked,
        DarkMode: darkSwitch.checked,
        Geo: geoFormat.value,
        CustomProxy: proxyInput.value,
        InstaUse: InstaUse.value,
        InstaPass: InstaPass.value,
        downloadPath: downloadfolder.value
    }, function (error) {
        if (error)
            throw error;
    });
    console.log('New Settings Saved!');
}
exports.settingSave = settingSave;
;
function settingSet() {
    utils_1.storage.set('settings', {
        UrlWipe: 'false',
        DarkMode: 'false',
        Geo: '',
        CustomProxy: '',
        InstaUse: '',
        InstaPass: '',
        downloadPath: ''
    }, function (error) {
        if (error)
            throw error;
    });
    console.log('Setting File Created!');
}
exports.settingSet = settingSet;
;
