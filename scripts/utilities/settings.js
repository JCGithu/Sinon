const { docReady, lineBreak } = require('./utils.js');
const storage = require('electron-json-storage');
const { settingDelete, settingSet, settingSave } = require('./storage.js');

docReady(function () {
  const userDataPath = app.getPath('userData');
  const storagePath = path.join(userDataPath, '/.');
  //Frame Style
  document.getElementsByClassName('maindiv')[0].style.borderRadius = '10%';

  storage.setDataPath(storagePath);
  const dataPath = storage.getDataPath();

  //Settings Init
  storage.has('settings', function (error, data) {
    if (error) throw error;
    if (!data) {
      settingSet();
    }
  });

  //Dark Mode
  document.getElementById('darkMode').addEventListener('change', function () {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000);
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });

  //Close App
  document.getElementById('close').addEventListener('click', function () {
    win.close();
  });

  //Initial Settings Check
  storage.get('settings', function (error, data) {
    if (error) throw error;
    for (let setting in data) {
      if (document.getElementById(setting)) {
        if (data[setting].type == 0) {
          document.getElementById(setting).checked = data[setting].value;
        } else {
          document.getElementById(setting).value = data[setting].value;
        }
        if (document.getElementById('darkMode').checked) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      }
    }
  });

  //Save Settings
  var waitTimer;
  const settingsSelect = ['darkMode', 'urlWipe', 'geo', 'customProxy', 'downloadPath'];
  for (const sets of settingsSelect) {
    document.getElementById(sets).addEventListener('change', function () {
      storage.get('settings', function (error, data) {
        if (error) throw error;
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave(sets, data), 2000);
      });
    });
  }

  //Settings Delete
  document.getElementById('settingDelete').addEventListener('click', function () {
    settingDelete();
  });

  //Console Startup Log
  lineBreak();
  console.log('FFmpeg ::: ' + versionInfo.ffmpegPath);
  console.log('Extractor ::: ' + versionInfo.extractorPath);
  console.log('OS ::: ' + versionInfo.OS);
  console.log('Settings file ::: ' + dataPath);
});
