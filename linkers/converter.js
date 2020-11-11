import videoConvert from './converters/video.js';
import audioConvert from './converters/audio.js';
import gifConvert from './converters/gif.js';

import { swalColours, lineBreak } from './Utilities/utils.js';

async function run_convert(){
    lineBreak();
    let swalColour = swalColours();
    var convertFile = document.getElementById('downloadFile').value;
    var e = document.getElementById("convertFormat");
    let convertInfo = {
        file: convertFile,
        format: e.options[e.selectedIndex].value,
        outputFile: path.join(path.parse(convertFile).dir, path.parse(convertFile).name),
        inputExt: path.parse(convertFile).ext
    }

    console.log('Converter running');
    console.log(convertInfo);
    lineBreak();

    //VIDEO
    
    if (convertInfo.format.indexOf('video')>=0){
        videoConvert(convertInfo, swalColour);
    } 

    //AUDIO
    if (convertInfo.format.indexOf('audio')>=0){
        audioConvert(convertInfo, swalColour);
    }

    //GIF
    if (convertInfo.format.indexOf('gif')>=0){
        gifConvert(convertInfo, swalColour);
    }
};