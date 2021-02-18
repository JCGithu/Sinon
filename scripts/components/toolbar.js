<<<<<<< Updated upstream
const toolbar = {
  name: 'toolbar',
  view() {
    return `
			<header>
				<svg id="toolbar" viewBox="0 0 448 512">
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
					<a style="font-size: 8pt;" class="grow-on-hover" id='version'>Version <span id='ver'>1.3</span></a>
				</div>
			</header>
    `;
=======
var toolBar = {
  name: 'toolBar',
  view: function () {
    return (
      '\n\t\t\t<header>\n\t\t\t\t<svg id="toolBar" viewBox="0 0 448 512">\n\t\t\t\t\t<use xlink:href="../imgs/tools.svg#toolBox"></use>\n\t\t\t\t</svg>\n\t\t\t\t<div class="colourstrip"></div>\n\t\t\t\t<div class="banner">\n\t\t\t\t\t<svg id="close" viewBox="0 0 512 512">\n\t\t\t\t\t\t<use xlink:href="../imgs/tools.svg#closeBox"></use>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg id="optionsIcon" viewBox="0 0 640 512">\n\t\t\t\t\t\t<use xlink:href="../imgs/tools.svg#optionsBox"></use>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<a style="font-size: 8pt;" class="grow-on-hover" id=\'version\'>Version <span id=\'ver\'>' +
      packageVersion +
      '</span></a>\n\t\t\t\t</div>\n\t\t\t</header>\n    '
    );
>>>>>>> Stashed changes
  },
};
module.exports = toolBar;
//# sourceMappingURL=toolBar.js.map
