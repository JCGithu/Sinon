const toolDown = {
    name: 'toolDown',
    view(){
        return `
            <div>
                <input type="text" id="inputURL" placeholder="Enter URL">
            </div>
            <div style="margin-bottom: 5vh">
                <input type="text" id= 'downloadfolder' placeholder="Enter Download Folder">
                <button id="downloadtext">Pick Folder</button>
            </div>
            <div>
                <button style="position: absolute; left: 25%; z-index: 2;" id='runTool' class="grow-on-hover" onclick="run_pynon()">Run!</button>
            </div>
        `
    }
}

export default toolDown