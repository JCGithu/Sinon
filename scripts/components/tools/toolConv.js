const toolConv = {
  name: 'toolConv',
  view() {
    return `
			<div style="margin-bottom: 5vh">
				<input type="text" id= 'downloadFile' class="inputBox" placeholder="">
				<button id="convFileButton" class="fileButton">Choose a File</button>
			</div>
			<div style='display: flex; flex-direction: column; justify-content: center; align-items: center;'>
				<div class='select'>
					<select id='convertFormat' class="convFormat">
						<option value='video'>Video</option>
						<option value='audio'>Audio</option>
						<option value='gif'>GIF</option>W
					</select>
				</div>
			</div>
			<div style="margin-top: 5vh">
				<button style="position: absolute; left: 25%; z-index: 2;" id='convRun' class="grow-on-hover runButton">Convert!</button>
			</div>
		`;
  },
};

module.exports = toolConv;
