const toolDown = {
  name: 'toolDown',
  view() {
    return `
			<div>
				<input type="text" id="inputURL" class="inputBox" placeholder="Enter URL">
			</div>
			<div style="margin-bottom: 5vh">
				<input type="text" id='downloadPath' placeholder="Enter Download Folder">
				<button id="downFileButton" class="fileButton">Pick Folder</button>
			</div>
			<div>
				<button style="position: absolute; left: 25%; z-index: 2;" id='pynonRun' class="grow-on-hover runButton">Run!</button>
			</div>
		`;
  },
};

module.exports = toolDown;
