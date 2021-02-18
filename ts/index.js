const { remote, ipcRenderer } = require('electron');
const Swal = require('sweetalert2');
const { app, dialog } = require('electron').remote;

const win = remote.getCurrentWindow();
const fs = require('fs');
const path = require('path');
const os = require('os');

const FFmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(FFmpegStatic);

var contents = fs.readFileSync(path.resolve(__dirname, '..') + '/package.json');
const packageVersion = JSON.parse(contents).version;

const ffmpegOptions = {
  cwd: FFmpegStatic,
};

const versionInfo = {
  OS: '',
  ExtractorSet: './extractor',
  ffmpegSet: './ffmpeg',
  ffmpegPath: FFmpegStatic,
};

const cpuCount = os.cpus().length;
//console.log(cpuCount)

var OSs = ['Win', 'Mac', 'X11', 'Linux'];
var plat = ['Windows', 'MacOS', 'UNIX', 'Linux'];

for (let i = 0; i < OSs.length; i++) {
  if (navigator.appVersion.indexOf(OSs[i]) != -1) {
    versionInfo.OS = plat[i];
  }
  if (navigator.appVersion.indexOf('Windows') != -1) {
    versionInfo.ExtractorSet = 'extractor';
    versionInfo.ffmpegSet = 'ffmpeg';
  }
}

const extractorPath = path.join(__dirname, '/../../engine/dist/extractor');
if (fs.existsSync(extractorPath)) {
  versionInfo.extractorPath = extractorPath;
} else {
  const extractorPath = path.join(__dirname, '/../engine/dist/extractor');
  versionInfo.extractorPath = extractorPath;
}

const Block = require('../scripts/block');
const swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50' };

//Components
const wave = require('../scripts/components/wave');
const toolmenu = require('../scripts/components/toolmenu');
const optionsPage = require('../scripts/components/optionsPage');
const documentation = require('../scripts/components/documentation');
const toolBar = require('../scripts/components/toolBar');
const mainTitle = require('../scripts/components/title');

//Tool components
const toolDown = require('../scripts/components/tools/toolDown');
const toolConv = require('../scripts/components/tools/toolConv');
const toolEffect = require('../scripts/components/tools/toolEffect');

const { toolSwap } = require('../scripts/utilities/animations');
const { versionChecker } = require('../scripts/utilities/utils');
const proxyGenerator = require('../scripts/utilities/proxy');

const sinon = new Block('#sinon');

var bootComps = [wave, toolmenu, optionsPage, documentation, toolBar, mainTitle];
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
  let customProxy = document.getElementById('customProxy');
  let versionNumber = document.getElementById('ver');
  if (target) {
    target.innerHTML = fs.readFileSync(path.resolve(__dirname, '../GUI/changelog.html'), 'utf-8');
    const animations = require('../scripts/utilities/animations');
    const settings = require('../scripts/utilities/settings');
    const tools = require('../scripts/utilities/toolFunctions');
    toolSwap(toolKit);
    versionChecker();
    if (customProxy.value == '') {
      proxyGenerator().then((proxy) => {
        customProxy.value = proxy;
      });
    }
  }
}

sinonBoot();
