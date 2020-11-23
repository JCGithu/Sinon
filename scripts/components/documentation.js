const documentation = {
  name: 'documentation',
  view() {
    return `
			<div class="docbg">
			<div id='docbar'></div>
			<h1>Documentation</h1>
				<div class="docstuff">
					<div id='docText'></div>
				</div>
			<svg id="closedocs" viewBox="0 0 512 512">
				<use xlink:href="../imgs/tools.svg#downArrow"></use>
			</svg>
			</div>
    `;
  },
};

module.exports = documentation;
