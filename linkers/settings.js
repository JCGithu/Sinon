const app = remote.app;

function settingSave() {
    storage.set('settings', { UrlWipe: $("#urlswitch").prop("checked"), DarkMode: $("#darkswitch").prop("checked"), Geo: $("#geoFormat").children("option:selected").val(), CustomProxy : document.getElementById('proxyInput').value, InstaUse : document.getElementById('InstaUse').value, InstaPass : document.getElementById('InstaPass').value, downloadPath : document.getElementById('downloadfolder').value }, function(error) {
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
$(document).ready(function (){

    //Initial Animations
    $(".maindiv").css("border-radius", "10%");
    $('#optionstrip').fadeOut()
    $("#docbar").fadeOut()
    $(".colourstrip").hide().show(2500);
    $('#currentTool').load('../GUI/tool_down.html');

    var textWrapper = document.querySelector('.mainTitle .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline()
    .add({
      targets: '.mainTitle .letter',
      translateY: [-200,0],
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 5400,
      delay: (el, i) => (60 + (i*2)) * i
    })

    //Documentation Transition
    $("#ver").click(function() {
        $(".docbg").animate({bottom: '0'},1000,'swing');
        $("#docbar").delay(1000).fadeIn(1000);
    });

    $("#closedocs").click(function() {
        $(".docbg").animate({bottom: '100vh'},500,'swing');
        $("#docbar").delay(1000).fadeOut(1000);
    });

    //Options Transition

    $("#options").click(function() {
        $(".optionsbg").animate({top: '0'},1000,'swing');
        $("#optionstrip").delay(1000).fadeIn(1000);
    });

    $("#closeoptions").click(function() {
        $(".optionsbg").animate({top: '100vh'},500,'swing');
        $('#optionstrip').fadeOut(300);
    });

    //Toolbar Animations
    $('#toolbar').click(function(){
        $(".toolMenu").animate({left: '0'},650,'swing');
    });

    function dmenu (){
        $('#currentTool').load('../GUI/tool_down.html');
    }
    function cmenu (){
        $('#currentTool').load('../GUI/tool_conv.html');
    }
    function emenu (){
        $('#currentTool').load('../GUI/tool_effect.html');
    }
    function folderLoad(){
        storage.get('settings', function(error, data) {
        if (error) throw error;
        if (data.downloadPath) {
            if (data.downloadPath !== null){
                document.getElementById('downloadfolder').value = data.downloadPath
                console.log ('Previous download path found')
            }
        }
        });
    }

    $('#closeTool').click(function(){
        $(".toolMenu").animate({left: '-40vw'},350,'swing');
    });
    
    var menuTime
    var settingTime
    var [menuTimer, settingTimer, menuCurrent] = [700,800,'down']

    $('#MenuD').click(function(){
        if (menuCurrent !== 'down') {
            clearTimeout(menuTime);
            clearTimeout(settingTime)
            menuTime = setTimeout(dmenu, menuTimer);
            settingTime = setTimeout(folderLoad, settingTimer)
            $('#currentTool').animate({left: "100vw"}, 600,'swing').animate({left: "-100vw"},0).animate({left: "0"},500,'swing');
        }
        $(".toolMenu").animate({left: '-40vw'},350,'swing');
        menuCurrent = 'down'
    });

    $('#MenuC').click(function(){
        if (menuCurrent !== 'conv') {
            clearTimeout(menuTime);
            menuTime = setTimeout(cmenu, menuTimer);
            $('#currentTool').animate({left: "100vw"}, 600,'swing').animate({left: "-100vw"},0).animate({left: "0"},500,'swing');
        }
        $(".toolMenu").animate({left: '-40vw'},350,'swing');
        menuCurrent = 'conv'
    })

    $('#MenuE').click(function(){
        if (menuCurrent !== 'effect') {
            clearTimeout(menuTime);
            menuTime = setTimeout(emenu, menuTimer);
            $('#currentTool').animate({left: "100vw"}, 600,'swing').animate({left: "-100vw"},0).animate({left: "0"},500,'swing');
        }
        $(".toolMenu").animate({left: '-40vw'},350,'swing');
        menuCurrent = 'effect'
    })

    //Initial Settings Check

    const userData = app.getPath('userData');
    console.log(userData);

    const storage = require('electron-json-storage');
    storagePath = path.join(userData, '/.');
    storage.setDataPath(storagePath)
    const dataPath = storage.getDataPath();
    
    storage.has('settings', function(error, data) {
        if (error) throw error;
        if (data){
            console.log('Settings File Found')
            console.log('Settings File is located:')
            console.log(dataPath);
        } else {
            console.log('No Settings File Found')
            settingSet();
            console.log('Settings File has been saved to:')
            console.log(dataPath);
        }
    })

    //Settings Boot Up

    storage.get('settings', function(error, data) {
        if (error) throw error;
        if (data.DarkMode == true){
            console.log ('Dark Mode setting on');
            $("#darkswitch").prop("checked", true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        if (data.UrlWipe == true){
            $("#urlswitch").prop("checked", true);
            console.log ('URL auto delete setting on');
        }
        if (data.Geo == 'US'){
            $("#geoFormat").val("US");
            console.log ('Geo is set to: US');
        } else {
            console.log ("Geo is set to: UK")
        }
        if (data.downloadPath){
            if (data.CustomProxy !== null){
                document.getElementById('proxyInput').value = data.CustomProxy;
                console.log ('Custom proxy setting found');
            }
            if (data.InstaUse !== null){
                document.getElementById('InstaUse').value = data.InstaUse;
                console.log ('Instagram username found');
            }
            if (data.InstaPass !== null){
                document.getElementById('InstaPass').value = data.InstaPass;
                console.log ('Instagram password found');
            }
            if (data.downloadPath !== null){
                document.getElementById('downloadfolder').value = data.downloadPath;
                console.log ('Previous download path found');
            }
        } else {
            document.getElementById('downloadfolder').value = '';
            document.getElementById('InstaUse').value = '';
            document.getElementById('InstaPass').value = '';
            document.getElementById('proxyInput').value = '';
        }
    });

    //Auto-Save Settings
    var waitTimer;
    $("#urlswitch, #darkswitch").click(function(){
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave, 5000);
    });
    $('#proxyInput, #InstaUse, #InstaPass').keyup(function(){
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave, 5000);
    });
    $("#geoFormat").change(function(){
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave, 5000);
    });
});