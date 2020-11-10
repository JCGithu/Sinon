const toolbar = {
    name: 'toolbar',
    view(){
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
                <a style="font-size: 8pt;" class="grow-on-hover" id="ver">Version 1.2.4</a>
            </div>
        </header>
    `
    }
}

export default toolbar