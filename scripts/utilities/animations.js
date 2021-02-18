var docReady = require('./utils').docReady;
var anime = require('animejs');
var ipcRenderer = require('electron').ipcRenderer;
var storage = require('electron-json-storage');
var pageElements = {
  toolMenu: '',
  docs: '',
  docBar: '',
  options: '',
  optionsBar: '',
  currentTool: '',
};
var inputText, runButton;
function startAnimation() {
  //Animation Variables
  pageElements.toolMenu = document.getElementsByClassName('toolMenu')[0];
  pageElements.docs = document.getElementsByClassName('docbg')[0];
  pageElements.docBar = document.getElementById('docbar');
  pageElements.options = document.getElementsByClassName('optionsbg')[0];
  pageElements.optionsBar = document.getElementById('optionstrip');
  pageElements.currentTool = document.getElementById('currentTool');
  //Title Animation
  var textWrapper = document.querySelector('.mainTitle .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline().add({
    targets: '.mainTitle .letter',
    translateY: [-200, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 5400,
    delay: function (el, i) {
      return (60 + i * 2) * i;
    },
  });
  //Wave Load
  anime({
    targets: '.wavecontainer',
    translateY: [400, 270],
    duration: 4000,
    easing: 'easeOutCubic',
  });
  //Toolbar Animations
  document.getElementById('toolBar').addEventListener('click', function () {
    pageElements.toolMenu.classList.add('toolOpen');
  });
  document.getElementById('toolClose').addEventListener('click', function () {
    pageElements.toolMenu.classList.remove('toolOpen');
  });
  inputText = document.querySelector('.inputBox');
  runButton = document.querySelector('.runButton');
  runButtonReset();
  documentationTransition();
  optionsTransition();
}
docReady(startAnimation);
function optionsTransition() {
  document.getElementById('optionsIcon').addEventListener('click', function () {
    pageElements.options.classList.add('optionsOpen');
    pageElements.optionsBar.classList.add('stripAnimate');
  });
  document.getElementById('closeOptions').addEventListener('click', function () {
    pageElements.options.classList.remove('optionsOpen');
    pageElements.optionsBar.classList.remove('stripAnimate');
    pageElements.optionsBar.style.opacity = '0';
  });
}
function documentationTransition() {
  document.getElementById('version').addEventListener('click', function () {
    pageElements.docs.classList.add('docsOpen');
    pageElements.docBar.classList.add('stripAnimate');
  });
  document.getElementById('closedocs').addEventListener('click', function () {
    pageElements.docs.classList.remove('docsOpen');
    pageElements.docBar.classList.remove('stripAnimate');
  });
}
function folderLoad() {
  storage.get('settings', function (error, data) {
    if (error) throw error;
    if (data.downloadPath) {
      if (data.downloadPath !== null) {
        document.getElementById('downloadPath').value = data.downloadPath;
      }
    }
  });
}
function toolSwap(toolKit) {
  var menus = document.querySelectorAll('#MenuD, #MenuC, #MenuE');
  var pages = ['toolDown', 'toolConv', 'toolEffect'];
  var menuCurrent = 'MenuD';
  var _loop_2 = function (i) {
    menus[i].addEventListener('click', function (info) {
      if (menuCurrent !== info.target.id) {
        setTimeout(function () {
          if (document.getElementById('downloadPath')) {
            folderLoad();
          }
        }, 800);
        pageElements.currentTool.classList.add('toolChange');
        setTimeout(function () {
          toolKit.showComponent(pages[i]);
        }, 700);
        setTimeout(function () {
          pageElements.currentTool.classList.remove('toolChange');
        }, 1500);
        setTimeout(function () {
          menuCurrent = info.target.id;
          runButtonReset();
        }, 800);
        pageElements.toolMenu.classList.remove('toolOpen');
      } else {
        if (pageElements.toolMenu.classList.contains('toolOpen')) {
          pageElements.toolMenu.classList.remove('toolOpen');
        }
      }
    });
  };
  for (var i = 0; i < menus.length; i++) {
    _loop_2(i);
  }
}
//TOOL HOTKEYS
var keys = ['numPress1', 'numPress2', 'numPress3'];
var keyMenus = ['MenuD', 'MenuC', 'MenuE'];
var _loop_1 = function (i) {
  ipcRenderer.on(keys[i], function () {
    var menu = document.getElementById(keyMenus[i]);
    menu.click();
  });
};
for (var i = 0; i < keys.length; i++) {
  _loop_1(i);
}
function runButtonReset() {
  inputText = document.querySelector('.inputBox');
  runButton = document.querySelector('.runButton');
  inputText.addEventListener('input', function () {
    if (pageElements.toolMenu.classList.contains('toolOpen')) {
      pageElements.toolMenu.classList.remove('toolOpen');
    }
    runButtonShow(inputText);
  });
}
function runButtonShow(inputText) {
  if (inputText.value.length < 1) {
    runButton.classList.remove('active');
  } else {
    runButton.classList.add('active');
  }
}
module.exports = { runButtonShow: runButtonShow, toolSwap: toolSwap };
//# sourceMappingURL=animations.js.map
