const app = remote.app;
const fs = require("fs");
const { version } = require("process");
const {dialog} = require('electron').remote;

function settingSave() {
    storage.set('settings', { UrlWipe: document.getElementById('urlswitch').checked, DarkMode: document.getElementById('darkswitch').checked, Geo: document.getElementById('geoFormat').value , CustomProxy : document.getElementById('proxyInput').value, InstaUse : document.getElementById('InstaUse').value, InstaPass : document.getElementById('InstaPass').value, downloadPath : document.getElementById('downloadfolder').value }, function(error) {
        if (error) throw error;
    })
    console.log('New Settings Saved!')
};
function settingSet() {
    storage.set('settings', { UrlWipe: 'false', DarkMode: 'false', Geo:'', CustomProxy : '', InstaUse : '', InstaPass : '', downloadPath : '' }, function(error) {
        if (error) throw error;
    })
    console.log('Setting File Created!')
};
function settingDelete(){
    Swal.fire({
        icon: 'warning',
        title: 'Delete Settings',
        text: 'Are you sure you want to delete the settings?',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: swalLoading,
        toast:false,
        customClass: 'swal-size-sm',
        target: document.getElementById('swalframe'),
    }).then((result) => {
        if (result.value) {
            storage.clear(function(error) {
                if (error) throw error;
            });
            console.log ('Settings deleted');
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                showConfirmButton: true,
                backdrop: swalLoading,
                toast:false,
                customClass: 'swal-size-sm',
                target: document.getElementById('swalframe'),
            });
        };
    });
};

docReady(function(){

    //Frame Style
    document.getElementsByClassName("maindiv")[0].style.borderRadius = "10%";

    //Dark Mode
    var checkbox = document.querySelector('input[name=mode]');
    checkbox.addEventListener('change', function() {
        if(this.checked) {
            trans()
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            trans()
            document.documentElement.setAttribute('data-theme', 'light')
        }
    })
    let trans = () => {
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition');
        }, 1000)
    };

    //Close App
    document.getElementById('close').addEventListener('click', function(){win.close()});

    //Initial Settings Check

    const userData = app.getPath('userData');

    const storage = require('electron-json-storage');
    storagePath = path.join(userData, '/.');
    storage.setDataPath(storagePath)
    const dataPath = storage.getDataPath();
    
    storage.has('settings', function(error, data) {
        if (error) throw error;
        if (data){
        } else {
            settingSet();
        }
    })

    //Settings Boot Up

    storage.get('settings', function(error, data) {
        if (error) throw error;
        if (data.DarkMode == true){
            document.getElementById("darkswitch").checked = true;
            document.documentElement.setAttribute('data-theme', 'dark');
        };
        if (data.UrlWipe == true){
            document.getElementById("urlswitch").checked = true;
        };
        if (data.Geo == 'US'){
            document.getElementById('geoFormat').value = "US"
        };
        if (data.downloadPath){
            if (data.CustomProxy !== null){
                document.getElementById('proxyInput').value = data.CustomProxy;
            }
            if (data.InstaUse !== null){
                document.getElementById('InstaUse').value = data.InstaUse;
            }
            if (data.InstaPass !== null){
                document.getElementById('InstaPass').value = data.InstaPass;
            }
            if (data.downloadPath !== null){
                document.getElementById('downloadfolder').value = data.downloadPath;
            }
        } else {
            document.getElementById('downloadfolder').value = '';
            document.getElementById('InstaUse').value = '';
            document.getElementById('InstaPass').value = '';
            document.getElementById('proxyInput').value = '';
        }
    });

    //Version Checker!
    const got = require('got');

    var appVersion = document.getElementById("ver").innerHTML;
    var appVersion = appVersion.toString().replace('Version','').replace(' ','');
    
    (async () => {
        try {
            const response = await got('https://jackgracie.co.uk/sinon');
            version = /Version (\d.\d.\d)/.exec(response.body)
            version = version[0].toString().replace(' ','').replace('Version','');
            if (version !== appVersion){
                document.getElementById("ver").style.color = 'var(--hover)';
            }
        } catch (error) {
            console.log(error);
        }
    })();

    //Auto-Save Settings
    var waitTimer;

    const switches = document.querySelectorAll("#urlswitch, #darkswitch");
    const textSettings = document.querySelectorAll('#proxyInput, #InstaUse, #InstaPass');
    const locals = document.getElementById('geoFormat');

    function autoSave () {
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave, 5000);
    };
    for (const swit of switches) {
        swit.addEventListener('click', function() {
            autoSave();
        })
    };
    for (const sets of textSettings) {
        sets.addEventListener("keyup", function(){
            autoSave();
        })
    };
    locals.addEventListener("change", function (){
        autoSave();
    });

    //Settings Delete

    document.getElementById('settingDelete').addEventListener("click", function(){
        settingDelete();
    });

    //Console Startup Log
    lineBreak();
    console.log('FFmpeg ::: ' + ffmpegPath);
    console.log('OS ::: ' + OSName);
    console.log('Settings file ::: ' + dataPath);
    lineBreak();
});