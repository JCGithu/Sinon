import Swal from 'sweetalert2';

export function runningAlert() {

    var swalOptions = {
        title: 'Running!',
        position: 'bottom',
        backdrop: false,
        toast: true,
        customClass: 'swal-running',
        target: document.getElementById('swalframe'),
        showCancelButton: true,
    }

    Swal.fire(swalOptions);
};
