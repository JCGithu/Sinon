const Swal = require('sweetalert2');

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

module.exports = {
    settingDelete
}