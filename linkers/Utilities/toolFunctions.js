import { settingSave } from './storage.js'
import { runButtonShow } from '../animations.js';

import pynon from '../pynon.js';
import effect from '../effect.js';
import convertor from '../converter.js';

var targetFiles;

document.body.addEventListener( 'click', function ( event ) {
    if (event.target.id == 'downFileButton') {
        dialog.showOpenDialog({
            properties: ['openDirectory'],
            title: 'Pick A Download Folder'
        }).then((data) => {
            console.log(data.filePaths);
            let downloadPath = data.filePaths;
            document.getElementById('downloadfolder').value = downloadPath.toString();
            setTimeout(settingSave, 5000);
        });
    } else if (event.target.id == 'effectFileButton' || event.target.id == 'convFileButton'){
        dialog.showOpenDialog({
            filters: [
                { name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'ts', 'm3u8','mpd','webm', 'mpg', 'flv', 'mov', 'gif'] },
                { name: 'Audio', extensions: ['mp3','flac','wav','aac', 'm4a']},
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile', 'multiSelections'],
            title: 'Pick A File'
        }).then((data) => {
            console.log(data.filePaths);
            targetFiles = data.filePaths;
            let fileTextBox = document.getElementById('downloadFile');
            fileTextBox.value = targetFiles.toString();
            let inputText = document.querySelector('.inputBox');
            runButtonShow(inputText);
        });
    };
    if (event.target.classList.contains('runButton'))
        if (event.target.id == 'pynonRun'){
            pynon();
        } else if (event.target.id == 'effectRun'){
            effect(targetFiles);
        } else {
            convertor(targetFiles);
        }
});