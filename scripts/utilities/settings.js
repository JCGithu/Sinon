var _a = require('./utils.js'), docReady = _a.docReady, lineBreak = _a.lineBreak;
var storage = require('electron-json-storage');
var _b = require('./storage.js'), settingDelete = _b.settingDelete, settingSet = _b.settingSet, settingSave = _b.settingSave;
docReady(function () {
    var userDataPath = app.getPath('userData');
    var storagePath = path.join(userDataPath, '/.');
    //Frame Style
    document.getElementsByClassName('maindiv')[0].style.borderRadius = '10%';
    storage.setDataPath(storagePath);
    var dataPath = storage.getDataPath();
    //Settings Init
    storage.has('settings', function (error, data) {
        if (error)
            throw error;
        if (!data) {
            settingSet();
        }
    });
    //Dark Mode
    document.getElementById('darkMode').addEventListener('change', function () {
        document.documentElement.classList.add('transition');
        window.setTimeout(function () {
            document.documentElement.classList.remove('transition');
        }, 1000);
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });
    //Close App
    document.getElementById('close').addEventListener('click', function () {
        win.close();
    });
    //Initial Settings Check
    storage.get('settings', function (error, data) {
        if (error)
            throw error;
        console.log(data);
        for (var setting in data) {
            if (data[setting].type == 0) {
                document.getElementById(setting).checked = data[setting].value;
            }
            else {
                document.getElementById(setting).value = data[setting].value;
            }
            if (document.getElementById('darkMode').checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    });
    //Save Settings
    var waitTimer;
    var settingsSelect = ['darkMode', 'urlWipe', 'geo', 'customProxy', 'downloadPath', 'instaPass', 'instaUse', 'instaCookie'];
    var _loop_1 = function (sets) {
        document.getElementById(sets).addEventListener('change', function () {
            storage.get('settings', function (error, data) {
                if (error)
                    throw error;
                clearTimeout(waitTimer);
                waitTimer = setTimeout(settingSave(sets, data), 2000);
            });
        });
    };
    for (var _i = 0, settingsSelect_1 = settingsSelect; _i < settingsSelect_1.length; _i++) {
        var sets = settingsSelect_1[_i];
        _loop_1(sets);
    }
    //Settings Delete
    document.getElementById('settingDelete').addEventListener('click', function () {
        settingDelete();
    });
<<<<<<< Updated upstream
  }
  locals.addEventListener('change', function () {
    autoSave();
  });

  let proxyChange = document.getElementById('proxyInput');
  proxyChange.addEventListener('keyup', function(){
    waitTimer = setTimeout(proxySave, 5000);
    clearTimeout(waitTimer);
  })

  //Settings Delete

  document.getElementById('settingDelete').addEventListener('click', function () {
    settingDelete();
  });

  //Console Startup Log
  lineBreak();
  console.log('FFmpeg ::: ' + versionInfo.ffmpegPath);
  console.log('OS ::: ' + versionInfo.OS);
  console.log('Settings file ::: ' + dataPath);
=======
    //Console Startup Log
    lineBreak();
    console.log('FFmpeg ::: ' + versionInfo.ffmpegPath);
    console.log('Extractor ::: ' + versionInfo.extractorPath);
    console.log('OS ::: ' + versionInfo.OS);
    console.log('Settings file ::: ' + dataPath);
>>>>>>> Stashed changes
});
//# sourceMappingURL=settings.js.map