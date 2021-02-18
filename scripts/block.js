var Block = /** @class */ (function () {
    function Block(selector) {
        this.appElement = document.querySelector(selector);
        this.components = {};
        this.toolRunning = '';
    }
    Block.prototype.addComponent = function (component) {
        this.components[component.name] = component;
    };
    Block.prototype.bootComponent = function (component) {
        this.addComponent(component);
        this.loadAll();
    };
    Block.prototype.showComponent = function (name) {
        this.currentComponent = this.components[name];
        this.updateView();
    };
    Block.prototype.updateView = function () {
        if (this.currentComponent) {
            this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model);
            this.toolRunning = this.currentComponent;
        }
    };
    Block.prototype.logComponent = function () {
        return this.appElement;
    };
    Block.prototype.logTool = function () {
        return this.toolRunning;
    };
    Block.prototype.loadAll = function () {
        var allComps = ' ';
        for (var comp in this.components) {
            allComps = allComps + this.components[comp].view(this.components[comp].model);
            this.appElement.innerHTML = allComps;
        }
    };
    return Block;
}());
module.exports = Block;
//# sourceMappingURL=block.js.map