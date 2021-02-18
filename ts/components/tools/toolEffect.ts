const toolEffect = {
  name: 'toolEffect',
  view() {
    return `
			<div style="margin-bottom: 5vh">
					<input type="text" id= 'downloadFile' class="inputBox" placeholder="">
					<button  id="effectFileButton" class="fileButton">Choose a File</button>
			</div>
			<div style='display: flex; flex-direction: row; justify-content: center; align-items: center;'>
					<div class='select'>
							<select id='convertFormat' class="convFormat" classNamePrefix='conv'>
									<option value='blur'>Social Media Blur</option>
									<option value='wave'>Generate Waveform</option>
									<option value='grabs'>Get Screengrabs</option>
									<option value='concat'>Join clips</option>
									<option value='custom'>Custom</option>
							</select>
					</div>
			</div>
			
			<div style="margin-top: 5vh">
					<button style="position: absolute; left: 25%; z-index: 2;" id='effectRun' class="grow-on-hover runButton">Generate!</button>
			</div>
			`;
  },
};

module.exports = toolEffect;
