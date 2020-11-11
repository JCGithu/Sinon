import { docReady } from './Utilities/utils.js';

const pageElements = {
    toolMenu: '',
    docs: '',
    docBar: '',
    options: '',
    optionsBar: '',
    currentTool: '',
};

const toolElements = {
    downPage: '../GUI/tool_down.html',
    convPage: '../GUI/tool_conv.html',
    effectPage: '../GUI/tool_effect.html',
    downloader: "import ('../linkers/pynon.js');",
    effector: "import ('../linkers/effect.js');",
    converter: "import ('../linkers/convertor.js')",
};

function startAnimation(){

    //Animation Variables
    pageElements.toolMenu = document.getElementsByClassName('toolMenu')[0];
    pageElements.docs = document.getElementsByClassName('docbg')[0];
    pageElements.docBar = document.getElementById('docbar');
    pageElements.options = document.getElementsByClassName('optionsbg')[0];
    pageElements.optionsBar = document.getElementById('optionstrip');
    pageElements.currentTool = document.getElementById('currentTool');

    //Tool Transition Variables
    var xhr= new XMLHttpRequest();
    let menuCurrent = 'down';

    //Title Animation
    let textWrapper = document.querySelector('.mainTitle .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline().add({
        targets: '.mainTitle .letter',
        translateY: [-200,0],
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 5400,
        delay: (el, i) => (60 + (i*2)) * i
    });

    //Wave Load
    anime({
        targets: '.wavecontainer',
        translateY:[400,270],
        duration: 4000,
        easing: 'easeOutCubic',
    });

    //Tool Transitions
    function toolReplace(page, intro){
        xhr.open('GET', page, true);
        xhr.onreadystatechange= function() {
            document.getElementById('currentTool').innerHTML = this.responseText;
        };
        xhr.onload = () => {
            if (intro){
                console.log('huzzah');
                let script = document.createElement("script");
                //script.innerHTML = downloader, effector, converter;
                script.id = 'jsTool';
                document.body.appendChild(script);
            }
        };
        xhr.send();
    };
    
    //Toolbar Animations

    document.getElementById('toolbar').addEventListener('click', function(){
        pageElements.toolMenu.classList.add('toolOpen');
    });

    function folderLoad(){
        storage.get('settings', function(error, data) {
        if (error) throw error;
        if (data.downloadPath) {
            if (data.downloadPath !== null){
                document.getElementById('downloadfolder').value = data.downloadPath;
            }
        }
        });
    }

    document.getElementById('toolClose').addEventListener("click", function(){
        pageElements.toolMenu.classList.remove('toolOpen');
    });

    let menus = document.querySelectorAll('#MenuD, #MenuC, #MenuE');
    let pages = [toolElements.downPage, toolElements.convPage, toolElements.effectPage];

    for (let i = 0; i < menus.length; i++) {
        menus[i].addEventListener("click", function(info){
            if (menuCurrent !== info.target.id) {
                setTimeout(function(){
                    if (document.getElementById('downloadfolder')){folderLoad()}
                }, 800);
                pageElements.currentTool.classList.add('toolChange');
                setTimeout(function(){
                    toolReplace(pages[i], false);
                }, 700);
                setTimeout(function(){
                    pageElements.currentTool.classList.remove('toolChange');
                }, 1500);
                pageElements.toolMenu.classList.remove('toolOpen');
            } else {
                pageElements.toolMenu.classList.remove('toolOpen');
            };
            menuCurrent = info.target.id;
        });
    }
    
    //toolReplace(toolElements.downPage, true);
    documentationTransition();
    optionsTransition();
}

docReady(startAnimation);

//Options Transition
function optionsTransition(){
    document.getElementById('optionsIcon').addEventListener('click', function(){
        pageElements.options.classList.add('optionsOpen');
        pageElements.optionsBar.classList.add('stripAnimate');
    });
    document.getElementById('closeOptions').addEventListener('click', function(){
        pageElements.options.classList.remove('optionsOpen');
        pageElements.optionsBar.classList.remove('stripAnimate');
        pageElements.optionsBar.style.opacity = '0';
    });
}

function documentationTransition(){
    document.getElementById('ver').addEventListener('click', function(){
        pageElements.docs.classList.add('docsOpen');
        pageElements.docBar.classList.add('stripAnimate');
    });
    document.getElementById('closedocs').addEventListener('click', function(){
        pageElements.docs.classList.remove('docsOpen');
        pageElements.docBar.classList.remove('stripAnimate');
    });
}