const Block = require('../linkers/block');

const swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50' };

//Components
const wave = require('../linkers/components/wave');
const toolmenu = require('../linkers/components/toolmenu.js');
const optionsPage = require('../linkers/components/optionsPage.js');
const documentation = require('../linkers/components/documentation.js');
const toolbar = require('../linkers/components/toolbar.js');
const mainTitle = require('../linkers/components/title.js');

//Tool components
const toolDown = require('../linkers/components/tools/toolDown.js');
const toolConv = require('../linkers/components/tools/toolConv.js');
const toolEffect = require('../linkers/components/tools/toolEffect.js');

const { toolSwap } = require('../linkers/animations.js');
const proxyGenerator = require('../linkers/Utilities/proxy.js');

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
  if (target) {
    target.innerHTML = fs.readFileSync('./GUI/changelog.html', 'utf-8');
    const animations = require('../linkers/animations');
    const settings = require('../linkers/settings');
    const tools = require('../linkers/Utilities/toolFunctions');
    toolSwap(toolKit);
    if (proxyInput.value == '') {
      proxyGenerator().then((proxy) => {
        proxyInput.value = proxy;
      });
    }
  }
}

sinonBoot();
