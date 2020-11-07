const { convertAlert } = require('../alerts/convertAlert');
const { errorAlert } = require('../alerts/errorAlert');
const { successAlert } = require('../alerts/successAlert');
async function concat(multi, swalColour, format) {
    return new Promise((resolve) => {
        let ffmpegInputs = ffmpeg();
        let fileSettings;
        var getInputs = new Promise((resolve) => {
            effectFile.forEach(async function (fileSelected, index, array) {
                fileSettings = effectSetUp(fileSelected);
                ffmpegInputs = ffmpegInputs.input(fileSettings.inputFull);
                if (index === array.length - 1)
                    resolve();
                return ffmpegInputs;
            });
        });
        getInputs.then(() => {
            lineBreak();
            convertAlert(swalColours);
            console.log(ffmpegInputs);
            var finalOutput = fileSettings.outputFile + '-Sinon-Joined.mp4';
            ffmpegInputs
                .on('progress', function (progress) {
                progressBar(progress, format);
            })
                .on('error', function (err, stdout, stderr) {
                errorAlert('', 'effect', err, swalColour);
            })
                .mergeToFile(finalOutput)
                .outputOptions([
                '-map 0:a?',
            ])
                .on('end', function (stdout, stderr) {
                console.log('Merge Success!');
                win.setProgressBar(-1);
                resolve('Concat finished');
                if (multi == false) {
                    successAlert('effect', 'Clips merged', swalColour);
                }
            });
        });
    });
}
;
module.exports = {
    concat
};
