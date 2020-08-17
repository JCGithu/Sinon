docReady(function(){

    //Animation Variables
    const toolMenu = document.getElementsByClassName('toolMenu')[0];
    const docs = document.getElementsByClassName('docbg')[0];
    const docBar = document.getElementById('docbar');
    const options = document.getElementsByClassName('optionsbg')[0];
    const optionsBar = document.getElementById('optionstrip');

    //Tool Transition Variables
    var xhr= new XMLHttpRequest();
    var downPage = '../GUI/tool_down.html';
    var convPage = '../GUI/tool_conv.html';
    var effectPage = '../GUI/tool_effect.html';
    
    var downloader = '../linkers/pynon.js';
    var converter = '../linkers/converter.js';
    var effector = '../linkers/effect.js';

    var menuCurrent = 'down';

    //Title Animation
    var textWrapper = document.querySelector('.mainTitle .letters');
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
    function toolReplace(page){
        xhr.open('GET', page, true);
        xhr.onreadystatechange= function() {
            document.getElementById('currentTool').innerHTML = this.responseText;
        };
        xhr.send();
    };

    toolReplace(downPage);
    
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = downloader;
    script.id = 'jsTool';
    document.body.appendChild(script);

    /* document.body.append(Object.assign(document.createElement('script'),{type:"text/javascript"})); */
    
    function replacejs(file) {
        if (document.getElementById('jsTool')){
            document.getElementById('jsTool').removeChild;
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = file;
        script.id = 'jsTool';
        document.body.appendChild(script);
    };

    //Toolbar Animations

    document.getElementById('toolbar').addEventListener('click', function(){
        toolMenu.classList.add('toolOpen');
    });
    function dmenu (){
        toolReplace(downPage);
        replacejs(downloader)
    }
    function cmenu (){
        toolReplace(convPage);
        replacejs(converter);
    }
    function emenu (){
        toolReplace(effectPage);
        replacejs(effector);
    }

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
        toolMenu.classList.remove('toolOpen');
    });
    
    function animationRemove (){
        currentTool.classList.remove('toolChange');
    };

    function swap (menuRun){
        var currentTool = document.getElementById('currentTool');
        currentTool.classList.add('toolChange');
        setTimeout(menuRun, 700);
        setTimeout(animationRemove, 1500);
        toolMenu.classList.remove('toolOpen');
    };

    document.getElementById('MenuD').addEventListener("click", function(){
        if (menuCurrent !== 'down') {
            menuRun = dmenu;
            setTimeout(folderLoad, 800);
            swap (menuRun);
        };
        menuCurrent = 'down';
    });

    document.getElementById('MenuC').addEventListener("click", function(){
        if (menuCurrent !== 'conv') {
            menuRun = cmenu;
            swap (menuRun);
        };
        menuCurrent = 'conv';
    })

    document.getElementById('MenuE').addEventListener("click", function(){
        if (menuCurrent !== 'effect') {
            menuRun = emenu;
            swap (menuRun);
        };
        menuCurrent = 'effect';
    });

    //Documentation Transition

    document.getElementById('ver').addEventListener('click', function(){
        docs.classList.add('docsOpen');
        docBar.classList.add('stripAnimate');
    });
    document.getElementById('closedocs').addEventListener('click', function(){
        docs.classList.remove('docsOpen');
        docBar.classList.remove('stripAnimate');
    });

    //Options Transition
    document.getElementById('optionsIcon').addEventListener('click', function(){
        options.classList.add('optionsOpen');
        optionsBar.classList.add('stripAnimate');
    });
    document.getElementById('closeOptions').addEventListener('click', function(){
        options.classList.remove('optionsOpen');
        optionsBar.classList.remove('stripAnimate');
        optionsBar.style.opacity = '0';
    });

});
