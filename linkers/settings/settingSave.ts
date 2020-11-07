const storage = require('electron-json-storage');

function settingSave() {
    let URLSwitch = document.getElementById('urlswitch') as HTMLInputElement;
    let darkSwitch = document.getElementById('darkswitch') as HTMLInputElement;
    let geoFormat = document.getElementById('geoFormat') as HTMLInputElement;
    let proxyInput = document.getElementById('proxyInput') as HTMLInputElement;
    let InstaUse = document.getElementById('InstaUse') as HTMLInputElement;
    let InstaPass = document.getElementById('InstaPass') as HTMLInputElement;
    let downloadfolder = document.getElementById('downloadfolder') as HTMLInputElement;

    storage.set('settings', {
        UrlWipe: URLSwitch.checked,
        DarkMode: darkSwitch.checked,
        Geo: geoFormat.value ,
        CustomProxy : proxyInput.value,
        InstaUse : InstaUse.value,
        InstaPass : InstaPass.value,
        downloadPath : downloadfolder.value 
    }, function(error) {
        if (error) throw error;
    })
    console.log('New Settings Saved!')
};

module.exports = {
    settingSave
}