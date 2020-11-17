import Block from './block.js';

//Components
import wave from './components/wave.js';
import toolmenu from './components/toolmenu.js';
import optionsPage from './components/optionsPage.js';
import documentation from './components/documentation.js';
import toolbar from './components/toolbar.js';
import mainTitle from './components/title.js'

//Tool components
import toolDown from './components/tools/toolDown.js'
import toolConv from './components/tools/toolConv.js'
import toolEffect from './components/tools/toolEffect.js'

import './animations.js';
import './settings.js';

import { docsReplace } from './Utilities/docsReplace.js';
import { toolSwap } from './animations.js';
import proxyGenerator from './Utilities/proxy.js';

const sinon = new Block('#sinon');

var bootComps = [wave, toolmenu, optionsPage, documentation, toolbar, mainTitle];
var tools = [toolDown, toolConv, toolEffect];

const toolKit = new Block('#currentTool');
for (let tool of tools){
    toolKit.addComponent(tool);
}
toolKit.showComponent('toolDown');

async function sinonBoot(){
    for await (let comp of bootComps){
        sinon.addComponent(comp);
    }
    sinon.loadAll();
    let target = document.getElementById('docText');
    let proxyInput = document.getElementById('proxyInput');
    if (target){
        docsReplace().then((data) => {
            target.innerHTML = data
        });
        import('./Utilities/toolFunctions.js');
        toolSwap(toolKit);
        if (proxyInput.value == undefined || proxyInput.value == null || proxyInput.value == ''){
            proxyGenerator().then((proxy) =>{
                proxyInput.value = proxy;
            });
        }
    };
}

sinonBoot();