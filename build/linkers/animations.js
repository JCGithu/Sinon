"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var anime = require('animejs');
var utils_1 = require("./Utilities/utils");
console.log('animation ran');
function startAnimation() {
    //Animation Variables
    var toolMenu = document.getElementsByClassName('toolMenu')[0];
    var docs = document.getElementsByClassName('docbg')[0];
    var docBar = document.getElementById('docbar');
    var options = document.getElementsByClassName('optionsbg')[0];
    var optionsBar = document.getElementById('optionstrip');
    var currentTool = document.getElementById('currentTool');
    //Tool Transition Variables
    var xhr = new XMLHttpRequest();
    var downPage = '../GUI/tool_down.html';
    var convPage = '../GUI/tool_conv.html';
    var effectPage = '../GUI/tool_effect.html';
    var downloader = "require ('../build/linkers/pynon.js');";
    var effector = "require ('../build/linkers/effect.js');";
    var converter = "require ('../build/linkers/convertor.js');";
    var menuCurrent = 'down';
    //Title Animation
    var textWrapper = document.querySelector('.mainTitle .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline().add({
        targets: '.mainTitle .letter',
        translateY: [-200, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 5400,
        delay: function (el, i) { return (60 + (i * 2)) * i; }
    });
    //Wave Load
    anime({
        targets: '.wavecontainer',
        translateY: [400, 270],
        duration: 4000,
        easing: 'easeOutCubic',
    });
    //Tool Transitions
    function toolReplace(page, intro) {
        xhr.open('GET', page, true);
        xhr.onreadystatechange = function () {
            document.getElementById('currentTool').innerHTML = this.responseText;
        };
        xhr.onload = function () {
            if (intro) {
                console.log('huzzah');
                var script = document.createElement("script");
                script.innerHTML = downloader, effector, converter;
                script.id = 'jsTool';
                document.body.appendChild(script);
            }
        };
        xhr.send();
    }
    ;
    toolReplace(downPage, true);
    //Toolbar Animations
    document.getElementById('toolbar').addEventListener('click', function () {
        toolMenu.classList.add('toolOpen');
    });
    function folderLoad() {
        utils_1.storage.get('settings', function (error, data) {
            if (error)
                throw error;
            if (data.downloadPath) {
                if (data.downloadPath !== null) {
                    document.getElementById('downloadfolder').value = data.downloadPath;
                }
            }
        });
    }
    document.getElementById('toolClose').addEventListener("click", function () {
        toolMenu.classList.remove('toolOpen');
    });
    function animationRemove() {
        currentTool.classList.remove('toolChange');
    }
    ;
    function swap(menuRun) {
        currentTool.classList.add('toolChange');
        setTimeout(menuRun, 700);
        setTimeout(animationRemove, 1500);
        toolMenu.classList.remove('toolOpen');
    }
    ;
    document.getElementById('MenuD').addEventListener("click", function () {
        if (menuCurrent !== 'down') {
            setTimeout(folderLoad, 800);
            swap(toolReplace(downPage, false));
        }
        else {
            toolMenu.classList.remove('toolOpen');
        }
        ;
        menuCurrent = 'down';
    });
    document.getElementById('MenuC').addEventListener("click", function () {
        if (menuCurrent !== 'conv') {
            swap(toolReplace(convPage, false));
        }
        else {
            toolMenu.classList.remove('toolOpen');
        }
        ;
        menuCurrent = 'conv';
    });
    document.getElementById('MenuE').addEventListener("click", function () {
        if (menuCurrent !== 'effect') {
            swap(toolReplace(effectPage, false));
        }
        else {
            toolMenu.classList.remove('toolOpen');
        }
        ;
        menuCurrent = 'effect';
    });
    //Documentation Transition
    document.getElementById('ver').addEventListener('click', function () {
        docs.classList.add('docsOpen');
        docBar.classList.add('stripAnimate');
    });
    document.getElementById('closedocs').addEventListener('click', function () {
        docs.classList.remove('docsOpen');
        docBar.classList.remove('stripAnimate');
    });
    //Options Transition
    document.getElementById('optionsIcon').addEventListener('click', function () {
        options.classList.add('optionsOpen');
        optionsBar.classList.add('stripAnimate');
    });
    document.getElementById('closeOptions').addEventListener('click', function () {
        options.classList.remove('optionsOpen');
        optionsBar.classList.remove('stripAnimate');
        optionsBar.style.opacity = '0';
    });
}
utils_1.docReady(startAnimation);
