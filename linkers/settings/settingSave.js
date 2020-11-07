const storage = require('electron-json-storage');
function settingSave() {
    let URLSwitch = document.getElementById('urlswitch');
    let darkSwitch = document.getElementById('darkswitch');
    let geoFormat = document.getElementById('geoFormat');
    let proxyInput = document.getElementById('proxyInput');
    let InstaUse = document.getElementById('InstaUse');
    let InstaPass = document.getElementById('InstaPass');
    let downloadfolder = document.getElementById('downloadfolder');
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
    settingSave
};
