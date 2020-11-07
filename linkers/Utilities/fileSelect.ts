const { dialog } = require('electron').remote;

document.getElementById('downloadtext').addEventListener('click', function(){
    dialog.showOpenDialog({
        filters: [
            { name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'ts', 'm3u8','mpd','webm', 'mpg', 'flv', 'mov'] },
            { name: 'Audio', extensions: ['mp3','flac','wav','aac']},
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile', 'multiSelections'],
        title: 'Pick A File'
    }).then((data: { filePaths: any; }) => {
        console.log(data.filePaths)
        effectFile = data.filePaths;
        let downloadFile = document.getElementById('downloadFile') as HTMLInputElement
        downloadFile.value = effectFile;

        let runButton = document.getElementById("runTool");

        if(downloadFile.value.length < 1){
            runButton.classList.remove('active');
        } else {
            runButton.classList.add('active');
        }
        return effectFile
    });
});

// CONVERT

document.getElementById('downloadtext').addEventListener('click', function(){
    dialog.showOpenDialog({
        filters: [
            { name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'ts', 'm3u8','mpd','webm', 'mpg', 'flv', 'mov', 'gif'] },
            { name: 'Audio', extensions: ['mp3','flac','wav','aac', 'm4a']},
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile'],
        title: 'Pick A File'
    }).then((data) => {
        console.log(data.filePaths);
        var convertFile = data.filePaths;
        let fileTextBox = document.getElementById('downloadFile') as HTMLInputElement
        fileTextBox.value = convertFile;
        
        let inputText = document.getElementById('downloadFile');
        let runButton = document.getElementById("runTool");

        if(convertFile < 1){
            runButton.classList.remove('active');
        } else {
            runButton.classList.add('active');
        };
    });
});


