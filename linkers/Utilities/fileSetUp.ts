

function effectSetUp(fileSelected: any){
    var fileSettings = {
        outputFile: path.join(path.parse(fileSelected).dir, path.parse(fileSelected).name),
        inputFull: path.join(path.parse(fileSelected).dir, path.parse(fileSelected).base),
        inputExt: path.parse(fileSelected).ext,
        inputDir: path.parse(fileSelected).dir,
        inputName: path.parse(fileSelected).name,
        pngFolder: path.parse(fileSelected).dir + '\\' + path.parse(fileSelected).name
    }
    return fileSettings
}

module.exports = {
    effectSetUp
}
