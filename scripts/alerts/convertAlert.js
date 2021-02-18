var Swal = require('sweetalert2');
function convertAlert(swalColour) {
    Swal.fire({
        title: 'Generating...',
        html: "<p id='progressText'></p>",
        backdrop: swalColour.loading,
        allowOutsideClick: false,
        showConfirmButton: false,
        target: document.getElementById('swalframe')
    });
}
module.exports = convertAlert;
//# sourceMappingURL=convertAlert.js.map