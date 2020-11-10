import Block from './block.js';
import Router from './router.js';

//Components
import wave from './components/wave.js';
import toolmenu from './components/toolmenu.js';
import optionsPage from './components/optionsPage.js';
import documentation from './components/documentation.js';
import toolbar from './components/toolbar.js';
import mainTitle from './components/title.js'

import './animations.js';
//import './settings.js';

const sinon = new Block('#sinon');
//const router = new Router(tool);

var bootComps = [wave, toolmenu, optionsPage, documentation, toolbar, mainTitle];

async function sinonBoot(){
    for await (let comp of bootComps){
        sinon.addComponent(comp);
    }
    sinon.loadAll();
}

sinonBoot();

const toolKit = new Block('#maindiv');

//router.addRoute('downloader')