const { docReady, lineBreak } = require('./Utilities/utils.js');
const { settingDelete, settingSet, settingSave } = require('./Utilities/storage.js');

docReady(function () {
  const userDataPath = app.getPath('userData');
  const storagePath = path.join(userDataPath, '/.');
  //Frame Style
  document.getElementsByClassName('maindiv')[0].style.borderRadius = '10%';

  //Dark Mode
  var checkbox = document.querySelector('input[name=mode]');
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      trans();
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      trans();
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });
  let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000);
  };

  //Close App
  document.getElementById('close').addEventListener('click', function () {
    win.close();
  });

  //Initial Settings Check

  storage.setDataPath(storagePath);
  const dataPath = storage.getDataPath();

  storage.has('settings', function (error, data) {
    if (error) throw error;
    if (data) {
    } else {
      settingSet();
    }
  });

  //Settings Boot Up

  storage.get('settings', function (error, data) {
    if (error) throw error;
    let darkSwitch = document.getElementById('darkswitch');
    let urlSwitch = document.getElementById('urlswitch');
    let geoFormat = document.getElementById('geoFormat');
    let downloadfolder = document.getElementById('downloadfolder');
    let insta = {
      username: document.getElementById('InstaUse').value,
      password: document.getElementById('InstaPass').value,
    };
    let proxyInput = document.getElementById('proxyInput');

    if (data.DarkMode == true) {
      darkSwitch.checked = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    if (data.UrlWipe == true) {
      urlSwitch.checked = true;
    }
    if (data.Geo == 'US') {
      geoFormat.value = 'US';
    }
    if (data.downloadPath) {
      if (data.CustomProxy !== null) {
        proxyInput.value = data.CustomProxy;
      }
      if (data.InstaUse !== null) {
        insta.username = data.InstaUse;
      }
      if (data.InstaPass !== null) {
        insta.password = data.InstaPass;
      }
      if (data.downloadPath !== null) {
        downloadfolder.value = data.downloadPath;
      }
    } else {
      downloadfolder.value = '';
      insta.username = '';
      insta.password = '';
      proxyInput.value = '';
    }
  });

  //Auto-Save Settings
  var waitTimer;

  const switches = document.querySelectorAll('#urlswitch, #darkswitch');
  const textSettings = document.querySelectorAll('#proxyInput, #InstaUse, #InstaPass');
  const locals = document.getElementById('geoFormat');

  function autoSave() {
    clearTimeout(waitTimer);
    waitTimer = setTimeout(settingSave, 5000);
  }
  for (const swit of switches[Symbol.iterator]()) {
    swit.addEventListener('click', function () {
      autoSave();
    });
  }
  for (const sets of textSettings[Symbol.iterator]()) {
    sets.addEventListener('keyup', function () {
      autoSave();
    });
  }
  locals.addEventListener('change', function () {
    autoSave();
  });

  //Settings Delete

  document.getElementById('settingDelete').addEventListener('click', function () {
    settingDelete();
  });

  //Console Startup Log
  lineBreak();
  console.log('FFmpeg ::: ' + versionInfo.ffmpegPath);
  console.log('OS ::: ' + versionInfo.OS);
  console.log('Settings file ::: ' + dataPath);
  lineBreak();
});
