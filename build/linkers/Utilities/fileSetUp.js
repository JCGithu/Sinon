"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effectSetUp = void 0;
function effectSetUp(fileSelected) {
    var fileSettings = {
        outputFile: path.join(path.parse(fileSelected).dir, path.parse(fileSelected).name),
        inputFull: path.join(path.parse(fileSelected).dir, path.parse(fileSelected).base),
        inputExt: path.parse(fileSelected).ext,
        inputDir: path.parse(fileSelected).dir,
        inputName: path.parse(fileSelected).name,
        pngFolder: path.parse(fileSelected).dir + '\\' + path.parse(fileSelected).name
    };
    return fileSettings;
}
exports.effectSetUp = effectSetUp;
