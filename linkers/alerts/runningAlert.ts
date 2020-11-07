import Swal,{ SweetAlertOptions } from 'sweetalert2';

function runningAlert() {

    var swalOptions = {
        title: 'Running!',
        position: 'bottom',
        backdrop: false,
        toast: true,
        customClass: 'swal-running',
        target: document.getElementById('swalframe'),
        showCancelButton: true,
    } as SweetAlertOptions;

    Swal.fire(swalOptions);
};

module.exports = {
    runningAlert
};