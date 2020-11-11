class Block {
    constructor(selector){
        this.appElement = document.querySelector(selector);
        this.components = {};
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
        console.log(this.currentComponent);
        this.updateView();
    }
    updateView(){
        if (this.currentComponent){
            this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model);
        }
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