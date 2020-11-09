var dialog = require('electron').remote.dialog;
var effectFile;
document.getElementById('downloadtext').addEventListener('click', function () {
    dialog.showOpenDialog({
        filters: [
            { name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'ts', 'm3u8', 'mpd', 'webm', 'mpg', 'flv', 'mov'] },
            { name: 'Audio', extensions: ['mp3', 'flac', 'wav', 'aac'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile', 'multiSelections'],
        title: 'Pick A File'
    }).then(function (data) {
        console.log(data.filePaths);
        effectFile = data.filePaths;
        var downloadFile = document.getElementById('downloadFile');
        downloadFile.value = effectFile;
        var runButton = document.getElementById("runTool");
        if (downloadFile.value.length < 1) {
            runButton.classList.remove('active');
        }
        else {
            runButton.classList.add('active');
        }
        return effectFile;
    });
});
// CONVERT
document.getElementById('downloadtext').addEventListener('click', function () {
    dialog.showOpenDialog({
        filters: [
            { name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'ts', 'm3u8', 'mpd', 'webm', 'mpg', 'flv', 'mov', 'gif'] },
            { name: 'Audio', extensions: ['mp3', 'flac', 'wav', 'aac', 'm4a'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile'],
        title: 'Pick A File'
    }).then(function (data) {
        console.log(data.filePaths);
        var convertFile = data.filePaths;
        var fileTextBox = document.getElementById('downloadFile');
        fileTextBox.value = convertFile.toString();
        var inputText = document.getElementById('downloadFile');
        var runButton = document.getElementById("runTool");
        if (convertFile.length < 1) {
            runButton.classList.remove('active');
        }
        else {
            runButton.classList.add('active');
        }
        ;
    });
});
