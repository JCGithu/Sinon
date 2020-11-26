const successAlert = require('../alerts/successAlert.js');
const { swalColours } = require('./utils.js');

const storage = require('electron-json-storage');

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
        if (error) throw error;
      });
      console.log('Settings deleted');
      successAlert('delete', '', swalColour);
    }
  });
}

function proxySave(){
  let proxyInput = document.getElementById('proxyInput');
  storage.set(
    'settings',
    {
      UrlWipe: URLSwitch.checked,
      DarkMode: darkSwitch.checked,
      Geo: geoFormat.value,
      CustomProxy: proxyInput.value,
      InstaUse: InstaUse.value,
      InstaPass: InstaPass.value,
      downloadPath: downloadfolder.value,
    },
    function (error) {
      if (error) throw error;
    }
  );

}

function settingSave() {
  let URLSwitch = document.getElementById('urlswitch');
  let darkSwitch = document.getElementById('darkswitch');
  let geoFormat = document.getElementById('geoFormat');
  let InstaUse = document.getElementById('InstaUse');
  let InstaPass = document.getElementById('InstaPass');
  let downloadfolder = document.getElementById('downloadfolder');

  storage.set(
    'settings',
    {
      UrlWipe: URLSwitch.checked,
      DarkMode: darkSwitch.checked,
      Geo: geoFormat.value,
      InstaUse: InstaUse.value,
      InstaPass: InstaPass.value,
      downloadPath: downloadfolder.value,
    },
    function (error) {
      if (error) throw error;
    }
  );
  console.log('New Settings Saved!');
}

function settingSet() {
  storage.set(
    'settings',
    {
      UrlWipe: 'false',
      DarkMode: 'false',
      Geo: '',
      CustomProxy: '',
      InstaUse: '',
      InstaPass: '',
      downloadPath: '',
    },
    function (error) {
      if (error) throw error;
    }
  );
  console.log('Setting File Created!');
}

module.exports = { settingSet, settingSave, proxySave, settingDelete };
