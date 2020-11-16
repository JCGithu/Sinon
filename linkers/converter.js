import videoConvert from './converters/video.js';
import audioConvert from './converters/audio.js';
import gifConvert from './converters/gif.js';

import { swalColours, lineBreak } from './Utilities/utils.js';

async function run_convert(targetFiles) {
    lineBreak();
    let swalColour = swalColours();
    var convertFile = document.getElementById('downloadFile').value;
    var e = document.getElementById('convertFormat');
    var fileInfo = [];

    targetFiles.forEach(function(targetFile){
        let out = path.join(path.parse(targetFile).dir, path.parse(targetFile).name);
        let file = {
            input: targetFile,
            output: out,
            ext: path.parse(targetFile).ext
        }
        fileInfo.push(file);
    });

    let convertInfo = {
        targets: fileInfo,
        format: e.options[e.selectedIndex].value,
    };

    console.log('Converter running');
    console.log(convertInfo);
    lineBreak();

    eval(convertInfo.format + 'Convert(convertInfo, swalColour)');
}

export default run_convert;
