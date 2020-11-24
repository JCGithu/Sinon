const { remote, ipcRenderer } = require('electron');
const Swal = require('sweetalert2');
const { app, dialog } = require('electron').remote;

const win = remote.getCurrentWindow();
const fs = require('fs');
const path = require('path');

const FFmpegStatic = require('ffmpeg-static-electron');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = FFmpegStatic.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const ffmpegOptions = {
  cwd: ffmpegPath,
};

const versionInfo = {
  OS: '',
  ExtractorSet: 'extractor',
  ffmpegSet: 'ffmpeg',
  ffmpegPath: ffmpegPath,
  extractorPath: '',
};

var OSs = ['Win', 'Mac', 'X11', 'Linux'];
var plat = ['Windows', 'MacOS', 'UNIX', 'Linux'];

for (let i = 0; i > OSs.length; i++) {
  if (navigator.appVersion.indexOf(OSs[i]) != -1) {
    versionInfo.OS = plat[i];
  }
  if (navigator.appVersion.indexOf('Mac') != -1) {
    versionInfo.ExtractorSet = '../scripts/extractor';
    versionInfo.ffmpegSet = '../scripts/ffmpeg';
  }
}

win.webContents.openDevTools();

const Block = require('../scripts/block');
const swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50' };

//Components
const wave = require('../scripts/components/wave');
const toolmenu = require('../scripts/components/toolmenu');
const optionsPage = require('../scripts/components/optionsPage');
const documentation = require('../scripts/components/documentation');
const toolbar = require('../scripts/components/toolbar');
const mainTitle = require('../scripts/components/title');

//Tool components
const toolDown = require('../scripts/components/tools/toolDown');
const toolConv = require('../scripts/components/tools/toolConv');
const toolEffect = require('../scripts/components/tools/toolEffect');

const { toolSwap } = require('../scripts/utilities/animations');
const { versionChecker } = require('../scripts/utilities/utils');
const proxyGenerator = require('../scripts/utilities/proxy');

const sinon = new Block('#sinon');

var bootComps = [wave, toolmenu, optionsPage, documentation, toolbar, mainTitle];
var tools = [toolDown, toolConv, toolEffect];

const toolKit = new Block('#currentTool');
for (let tool of tools) {
  toolKit.addComponent(tool);
}
toolKit.showComponent('toolDown');

async function sinonBoot() {
  for await (let comp of bootComps) {
    sinon.addComponent(comp);
  }
  sinon.loadAll();
  let target = document.getElementById('docText');
  let proxyInput = document.getElementById('proxyInput');
  let versionNumber = document.getElementById('ver');
  if (target) {
    target.innerHTML = fs.readFileSync('./GUI/changelog.html', 'utf-8');
    const animations = require('../scripts/utilities/animations');
    const settings = require('../scripts/utilities/settings');
    const tools = require('../scripts/utilities/toolFunctions');
    toolSwap(toolKit);
    versionChecker();
    if (proxyInput.value == '') {
      proxyGenerator().then((proxy) => {
        proxyInput.value = proxy;
      });
    }
  }
}

sinonBoot();
