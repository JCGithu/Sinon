import { successAlert } from '../alerts/successAlert.js';
import { swalColours } from './utils.js';

import proxyGenerator from './proxy.js';

export function settingDelete(){
    var swalColour = swalColours();
    Swal.fire({
        icon: 'warning',
        title: 'Delete Settings',
        text: 'Are you sure you want to delete the settings?',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: swalColour.loading,
        toast:false,
        target: document.getElementById('swalframe'),
    }).then((result) => {
        if (result.value) {
            storage.clear(function(error) {
                if (error) throw error;
            });
            console.log ('Settings deleted');
            successAlert('delete','', swalColour)
        };
    });
};

export function settingSave() {
    let URLSwitch = document.getElementById('urlswitch')
    let darkSwitch = document.getElementById('darkswitch')
    let geoFormat = document.getElementById('geoFormat')
    let proxyInput = document.getElementById('proxyInput')
    let InstaUse = document.getElementById('InstaUse')
    let InstaPass = document.getElementById('InstaPass')
    let downloadfolder = document.getElementById('downloadfolder')

    storage.set('settings', {
        UrlWipe: URLSwitch.checked,
        DarkMode: darkSwitch.checked,
        Geo: geoFormat.value ,
        CustomProxy : ip,
        InstaUse : InstaUse.value,
        InstaPass : InstaPass.value,
        downloadPath : downloadfolder.value 
    }, function(error) {
        if (error) throw error;
    })
    console.log('New Settings Saved!')
};

export function settingSet() {
    storage.set('settings', {
        UrlWipe: 'false',
        DarkMode: 'false',
        Geo:'',
        CustomProxy : '',
        InstaUse : '',
        InstaPass : '',
        downloadPath : ''
    }, function(error) {
        if (error) throw error;
    })
    console.log('Setting File Created!');
};