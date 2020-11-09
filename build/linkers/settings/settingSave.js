"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingSave = void 0;
var utils_1 = require("../Utilities/utils");
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
