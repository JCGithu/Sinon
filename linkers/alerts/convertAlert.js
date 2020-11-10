import Swal,{ SweetAlertOptions } from 'sweetalert2';

export function convertAlert(swalColour){
    Swal.fire({
        title: 'Generating...',
        html: "<p id='progressText'></p>",
        backdrop: swalColour.loading,
        allowOutsideClick: false,
        showConfirmButton: false,
        target: document.getElementById('swalframe'),
    });
}