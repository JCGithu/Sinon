function runningAlert() {
  var swalOptions = {
    title: 'Running!',
    position: 'center',
    toast: true,
    customClass: 'swal-running',
    didOpen: () => {
      Swal.isLoading();
      Swal.showLoading();
    },
    target: document.getElementById('swalframe'),
    showCancelButton: false,
    showConfirmButton: false,
  };

  Swal.fire(swalOptions);
}

module.exports = runningAlert;
