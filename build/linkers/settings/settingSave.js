var storage = require('electron-json-storage');
function settingSave() {
    var URLSwitch = document.getElementById('urlswitch');
    var darkSwitch = document.getElementById('darkswitch');
    var geoFormat = document.getElementById('geoFormat');
    var proxyInput = document.getElementById('proxyInput');
    var InstaUse = document.getElementById('InstaUse');
    var InstaPass = document.getElementById('InstaPass');
    var downloadfolder = document.getElementById('downloadfolder');
    storage.set('settings', {
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
;
module.exports = {
    settingSave: settingSave
};
//# sourceMappingURL=settingSave.js.map