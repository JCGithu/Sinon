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
    if (target){
        docsReplace().then((data) => {
            target.innerHTML = data
        });
        import('./pynon.js');
        import('./effect.js');
        import('./converter.js');
        toolSwap(toolKit);
    };
}

sinonBoot();