const optionsPage = {
  name: 'optionsPage',
  view() {
    return `
			<div class = "optionsbg">
				<div class="colourstrip" id="optionstrip"></div>
				<h1>Options</h1>
				<div class="optionsblock">
					<div class="optionscontainer">
						<div class='optionscontainertwo'>
							<a>Dark Mode</a>
							<input class="container_toggle" type="checkbox" id="darkswitch" name="mode">
							<label for="darkswitch">Toggle</label>
							<a style="margin-top: 10px;">Auto-delete URL on completion</a>
							<input class="container_toggle" type="checkbox" id="urlswitch" name="urlwipe">
							<label for="urlswitch">Toggle</label>
							<a style="margin-top: 10px;">Country select</a>
							<select id='geoFormat' class="geoFormat" classNamePrefix='conv'>
								<option value='UK'>UK</option>
								<option value='US'>US</option>
							</select>
							<a style="margin-top: 10px;">Custom Proxy</a>
							<input type="text" id="proxyInput" placeholder="Enter Custom Proxy" style='width: 60vw !important'>
							<p>Proxies are only used if a website is <br> not available in your country</p>
							<a>Instagram Username</a>
							<input type="text" id="InstaUse" placeholder="Enter Instagram Username" style='width: 60vw !important'>
							<a style="margin-top: 10px;">Instagram Password</a>
							<input type="text" id="InstaPass" placeholder="Enter Instagram Password" style='width: 60vw !important'>
							<button id="settingDelete" class="grow-on-hover">Delete settings</button>
						</div>
					</div>
				</div>
				<svg id="closeOptions" viewBox="0 0 512 512">
					<use xlink:href="../imgs/tools.svg#downArrow"></use>
				</svg>
			</div>
    `;
  },
};

module.exports = optionsPage;
