const toolmenu = {
  name: 'toolmenu',
  view() {
    return `
			<div class="toolMenu">
				<h2>Tools</h2>
				<a id='MenuD' class="grow-on-hover">Downloader</a><br>
				<a id='MenuC' class="grow-on-hover">Converter</a><br>
				<a id='MenuE' class="grow-on-hover">Effects</a><br>
				<a id='toolClose' class="grow-on-hover">&#171;</a><br>
			</div>
    `;
  },
};

module.exports = toolmenu;
