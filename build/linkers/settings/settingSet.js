"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingSet = void 0;
var utils_1 = require("../Utilities/utils");
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
