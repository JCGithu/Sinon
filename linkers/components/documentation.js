

const documentation = {
    name: 'documentation',
    model: {
        test: 'what'
    },
    view(model){
        return `
        <div class="docbg">
        <div id='docbar'></div>
        <h1>Documentation</h1>
            <div class="docstuff">
                <div data-include = './changelog.html'></div>
            </div>
        <svg id="closedocs" viewBox="0 0 512 512">
            <use xlink:href="../imgs/tools.svg#downArrow"></use>
        </svg>
        </div>
    `
    }
}

export default documentation