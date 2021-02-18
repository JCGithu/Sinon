const toolBar = {
  name: 'toolBar',
  view() {
    return `
			<header>
				<svg id="toolBar" viewBox="0 0 448 512">
					<use xlink:href="../imgs/tools.svg#toolBox"></use>
				</svg>
				<div class="colourstrip"></div>
				<div class="banner">
					<svg id="close" viewBox="0 0 512 512">
						<use xlink:href="../imgs/tools.svg#closeBox"></use>
					</svg>
					<svg id="optionsIcon" viewBox="0 0 640 512">
						<use xlink:href="../imgs/tools.svg#optionsBox"></use>
					</svg>
					<a style="font-size: 8pt;" class="grow-on-hover" id='version'>Version <span id='ver'>${packageVersion}</span></a>
				</div>
			</header>
    `;
  },
};

module.exports = toolBar;
