class Block {
    constructor(selector){
        this.appElement = document.querySelector(selector);
        this.components = {};
        this.toolRunning = '';
    }
    addComponent(component){
        this.components[component.name] = component;
    }
    bootComponent(component){
        this.addComponent(component);
        this.loadAll();
    }
    showComponent(name){
        this.currentComponent = this.components[name];
        this.updateView();
    }
    updateView(){
        if (this.currentComponent){
            this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model);
            this.toolRunning = this.currentComponent;
        }
    }
    logTool(){
        return this.toolRunning;
    }
    loadAll(){
        var allComps = ' ';
        for (const comp in this.components){
            allComps = allComps + (this.components[comp].view(this.components[comp].model));
            this.appElement.innerHTML = allComps;
        };
    }
}

export default Block