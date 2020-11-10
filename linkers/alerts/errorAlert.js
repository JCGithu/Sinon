import { copyString } from "../Utilities/utils";
import Swal from 'sweetalert2';

export function errorAlert(error, errorType, errorText, swalColour, instaDeets) {
    let instaUse = document.getElementById('InstaUse')
    let instaPass = document.getElementById('InstaPass')
    error = error.toString().replace(instaPass.value, "").replace(instaUse.value, "");
    console.log(error);

    var swalOptions = {
        icon: 'error',
        backdrop: swalColour.fail,
        text: "Something went wrong. Please send error code and info.",
        toast: false,
        target: document.getElementById('swalframe'),
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Copy Error Code',
        preConfirm: () => {
            copyString(error);
        }
    }

    if (errorType == 'download'){
        swalOptions.title = 'Downloader Error!';
    } else if (errorType == 'proxy'){
        swalOptions.title = 'Proxy error!';
    } else if (errorType == 'effect'){
        swalOptions.title = 'Effect error!';
    } else if (errorType == 'convert'){
        swalOptions.title = 'Conversion error!';
    } else if (errorType == 'basic'){
        swalOptions.title = 'Error!';
        swalOptions.text = errorText;
        swalOptions.showCancelButton = false;
        delete swalOptions.confirmButtonText;
        delete swalOptions.preConfirm;
    }

    Swal.fire(swalOptions);
};

module.exports = {
    errorAlert
};