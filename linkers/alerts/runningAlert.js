export function runningAlert() {

    var swalOptions = {
        title: 'Running!',
        position: 'center',
        backdrop: false,
        toast: true,
        showLoading: true,
        customClass: 'swal-running',
        willOpen: () => {
            Swal.isLoading();
        },
        target: document.getElementById('swalframe'),
        showCancelButton: false,
        showConfirmButton: false,
    }

    Swal.fire(swalOptions);
};
