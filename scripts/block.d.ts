export = Block;
declare const Block: {
    new (selector: any): {
        appElement: any;
        components: {};
        toolRunning: string;
        addComponent(component: any): void;
        bootComponent(component: any): void;
        showComponent(name: any): void;
        currentComponent: any;
        updateView(): void;
        logComponent(): any;
        logTool(): string;
        loadAll(): void;
    };
};
