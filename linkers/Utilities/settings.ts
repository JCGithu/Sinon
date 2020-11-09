const Swal = require('sweetalert2');

import { storage } from '../Utilities/utils';

import { successAlert } from '../alerts/successAlert';
import { swalColours } from '../Utilities/utils';

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
    console.log('Setting File Created!')
};