const successAlert = require('../alerts/successAlert.js');
const { swalColours } = require('./utils.js');
const defaultSettings = require('./defaultSettings.json');

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
      successAlert('delete');
    }
  });
}

function settingSave(setID, data) {
  function runData(data) {
    console.log(data);
    if (data[setID].type == 0) {
      data[setID].value = document.getElementById(setID).checked;
    } else {
      data[setID].value = document.getElementById(setID).value;
    }
    settingSet(data);
  }
  if (!data) {
    storage.get('settings', function (error, data) {
      runData(data);
    });
  } else {
    runData(data);
  }
}

async function settingSet(data) {
  if (!data) {
    data = defaultSettings;
  }
  storage.set('settings', data, function (error) {
    if (error) throw error;
    console.log('Settings updated!');
  });
}

module.exports = { settingSet, settingSave, settingDelete };
