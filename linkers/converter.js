const { fstat } = require("fs");

document.getElementById('downloadtext').addEventListener('click', function(){
    dialog.showOpenDialog({
        filters: [
            { name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'ts', 'm3u8','mpd','webm', 'mpg', 'flv', 'mov'] },
            { name: 'Audio', extensions: ['mp3','flac','wav','aac', 'm4a']},
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile'],
        title: 'Pick A File'
    }).then((data) => {
        console.log(data.filePaths)
        var convertFile = data.filePaths;
        document.getElementById('downloadFile').value = convertFile;
        
        inputText = document.getElementById('downloadFile')
        runButton = document.getElementById("runTool");

        if(convertFile < 1){
            runButton.classList.remove('active');
        } else {
            runButton.classList.add('active');
        }
    });
});

async function run_convert(){
    lineBreak();
    swalColours();
    convertFile = document.getElementById('downloadFile').value;
    var e = document.getElementById("convertFormat");
    format = e.options[e.selectedIndex].value;
    outputFile = path.join(path.parse(convertFile).dir, path.parse(convertFile).name);
    inputExt = path.parse(convertFile).ext

    console.log('Converter running')
    console.log('file path: ', convertFile)
    console.log('format: ', format)
    console.log('output: ', outputFile)
    lineBreak();

    function swalConvert(){
        Swal.fire({
            title: 'Converting...',
            customClass: 'swal-size-sm',
            html: "<p id='progressText'></p>",
            backdrop: swalLoading,
            allowOutsideClick: false,
            showConfirmButton: false,
            target: document.getElementById('swalframe'),
        });
    };

    //MP4
    if (format.indexOf('mp4')>=0){
        if (inputExt.indexOf('.mp4')>=0){
            finalOutput = outputFile + '-SinonConverted.mp4'
        } else {
            finalOutput = outputFile + '.mp4'
        }
        console.log('Final output: ', finalOutput)
        lineBreak();
        swalConvert();
        ffmpeg(convertFile).format('mp4').on('progress', function(progress) {
            if (progress.percent === undefined){
                document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
            } else {
                document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
                console.log('Processing: ' + progress.percent + '% done');
                percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                win.setProgressBar(percentage);
            }
        }).save(finalOutput).on('end', function(stdout, stderr) {
            console.log('Conversion Success!');
            Swal.fire({
                icon: 'success',
                title: "Conversion Success!",
                customClass: 'swal-size-sm',
                backdrop: swalPass,
            });
            win.setProgressBar(-1);
        });
        console.log('mp4 running');
    }

    //MP3
    if (format.indexOf('mp3')>=0){
        if (inputExt.indexOf('.mp3')>=0){
            finalOutput = outputFile + '-SinonConverted.mp3'
        } else {
            finalOutput = outputFile + '.mp3'
        }
        console.log('Final output: ', finalOutput)
        lineBreak();
        swalConvert();
        ffmpeg(convertFile).format('mp3').noVideo().on('progress', function(progress) {
            document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
            console.log('Processing: ' + progress.percent + '% done');
            percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
            win.setProgressBar(percentage);
        }).save(finalOutput).on('end', function(stdout, stderr) {
            console.log('Conversion Success!');
            Swal.fire({
                icon: 'success',
                title: "Conversion Success!",
                customClass: 'swal-size-sm',
                backdrop: swalPass,
            });
            win.setProgressBar(-1);
        });
        console.log('mp3 running');
    }

    //GIF
    if (format.indexOf('gif')>=0){
        Swal.mixin({
            confirmButtonText: 'Next &rarr;',
            progressSteps: ['1', '2', '3'],
            backdrop: swalLoading,
            customClass: 'swal-size-sm',
            target: document.getElementById('swalframe')
        }).queue([
            {
                title: 'Resolution',
                text: 'Please choose the resolution of your GIF',
                input: 'select',
                inputOptions: {
                    High: '1080p',
                    hMid: '720p',
                    lMid: '480p',
                    low: '240p',
                },
                inputPlaceholder: 'Select Resolution',
            },
            {
                title: 'Quality',
                text: 'Please choose the quality of your GIF',
                input: 'select',
                inputOptions: {
                    High: 'High',
                    Mid: 'Normal',
                    Low: 'Optimised',
                },
                inputPlaceholder: 'Select Quality',
            },
            {
                title: 'Crop',
                text: 'Do you want to crop the GIF?',
                input: 'select',
                inputOptions: {
                    None: 'No',
                    Wide: 'Widescreen',
                    Square: 'Square',
                    Vertical: 'Vertical',
                    Two: "2:1"
                },
            }
        ]).then((result) => {
            if (result.value) {
                var answers = JSON.stringify(result.value);
                answers = answers.replace('[','').replace(']','').split(',');
                var [rez, qual, crop] = [answers[0].replace('"','').replace('"',''), answers[1].replace('"','').replace('"',''), answers[2].replace('"','').replace('"','')];
                console.log(rez);
                console.log(qual);
                console.log(crop);

                if (rez == 'High'){
                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=1080[rescaled]';
                } else if (rez == 'hMid'){
                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=720[rescaled]';
                } else if (rez == 'lMid'){
                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=480[rescaled]';
                } else if (rez == 'low'){
                    reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=240[rescaled]';
                };

                opti = false;

                if (qual == 'High'){
                    fps = '25'
                } else if (qual == 'Mid') {
                    fps = '12'
                } else if (qual == 'Low') {
                    fps = '10'
                    opti = true;
                };

                if (crop == 'None'){
                    gifCrop = '[rescaled]crop=w=iw[cropped]'
                } else if (crop == 'Wide') {
                    gifCrop = "[rescaled]crop='in_w:if(lt(in_w,in_h),in_w*(9/16),in_h)'[cropped]"
                } else if (crop == 'Square') {
                    gifCrop = "[rescaled]crop='if(lt(in_h,in_w),in_h,in_w):if(lt(in_w,in_h),in_w,in_h)'[cropped]"
                } else if (crop == 'Vertical'){
                    gifCrop = '[rescaled]crop=w=ih*(9/16)[cropped]'
                }else if (crop == 'Two'){
                    gifCrop = '[rescaled]crop=h=iw*0.5[cropped]'
                };

                if (inputExt.indexOf('.gif')>=0){
                    finalOutput = outputFile + '-SinonConverted.gif'
                    finalOutputName = path.parse(convertFile).name + '-SinonConverted.gif'
                } else {
                    finalOutput = outputFile + '.gif'
                    finalOutputName = path.parse(convertFile).name + '.gif'
                }
                OptimalOutput = outputFile + '_lossy.gif'
                
                ffmpeg(convertFile).format('gif').fps(fps).complexFilter([
                    '[0:v]mpdecimate[frames]', reRez, gifCrop],
                    'cropped').on('progress', function(progress) {
                    document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed() + '%';
                    console.log('Processing: ' + progress.percent + '% done');
                    percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                    win.setProgressBar(percentage);
                }).save(finalOutput).on('end', function(stdout, stderr) {
                    if (opti == true){
                        document.getElementById("progressText").textContent = 'Optimising';
                        execFile(gifsicle, ['-o', OptimalOutput, '--lossy=100', '-O3', '--colors=128',finalOutput], err => {
                            console.log('Conversion Success!');
                            fs.unlink(finalOutput, function (err) {
                                if (err) throw err;
                                console.log('File deleted!');
                            });
                            Swal.fire({
                                icon: 'success',
                                title: "Conversion Success!",
                                customClass: 'swal-size-sm',
                                backdrop: swalPass,
                            });
                            win.setProgressBar(-1);
                        });
                    } else {
                        win.setProgressBar(-1);
                        Swal.fire({
                            icon: 'success',
                            title: "Conversion Success!",
                            customClass: 'swal-size-sm',
                            backdrop: swalPass,
                        });
                    }
                });
                console.log('gif running');
                console.log('Final output: ', finalOutput)
                lineBreak();
                swalConvert();
            }
        })
    }
};