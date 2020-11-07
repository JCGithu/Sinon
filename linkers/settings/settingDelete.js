import Swal from 'sweetalert2';
function settingDelete() {
    var swalColour = swalColours();
    Swal.fire({
        icon: 'warning',
        title: 'Delete Settings',
        text: 'Are you sure you want to delete the settings?',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: swalColour.loading,
        toast: false,
        target: document.getElementById('swalframe'),
    }).then((result) => {
        if (result.value) {
            storage.clear(function (error) {
                if (error)
                    throw error;
            });
            console.log('Settings deleted');
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                showConfirmButton: true,
                backdrop: swalColour.loading,
                toast: false,
                target: document.getElementById('swalframe'),
            });
        }
        ;
    });
}
;
module.exports = {
    settingDelete
};
