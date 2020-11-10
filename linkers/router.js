class Router {
    constructor(tool) {
        this.tool = tool;
        this.routes = {
            '#MenuD': pynon,
            '#MenuC': downloader,
            '#MenuE': effector,
        };

        window.addEventListener('DOMContentLoaded', this.toolChange);

        let toolButtons = document.querySelectorAll("#MenuD, #MenuC, #MenuE");
        for (let i = 0; i < toolButtons.length; i++) {
            toolButtons[i].addEventListener("click", this.toolChange);
        }
    }
    addRoute(name){
        this.routes.push({
            name
        });
    }
    toolChange(){
        const toolName = this.routes.find(route => {
            return 
        });

        if (toolName){
            this.tool.showComponent(route.name);
        }
    }
}

export default Router;