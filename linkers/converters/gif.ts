const { convertAlert } = require('../alerts/convertAlert');
const { errorAlert } = require('../alerts/errorAlert');

import Swal  from 'sweetalert2';
const gifsicle = require('gifsicle');
const { execFile } = require('child_process');

interface swalResult {
    value: [];
}

async function gifConvert(convertInfo, swalColour){
    Swal.fire({
        icon: 'info',
        title: "Settings",
        text: "Normal or advanced settings?",
        input: 'select',
        inputOptions: {
            basic: 'Basic',
            advanced: 'Advanced',
        },
        confirmButtonText: 'Run!',
        showLoaderOnConfirm: true,
        backdrop: swalColour.loading,
        target: document.getElementById('swalframe'),
        preConfirm: (gifQual) => {
            if (gifQual == 'basic'){
                let finalOutput = convertInfo.outputFile + '.gif'
                let finalOutputName = path.parse(convertInfo.file).name + '.gif'
                if (convertInfo.inputExt.indexOf('.gif')>=0){
                    finalOutput = convertInfo.outputFile + '-SinonConverted.gif'
                    finalOutputName = path.parse(convertInfo.file).name + '-SinonConverted.gif'
                }
                let OptimalOutput = convertInfo.outputFile + '_basic.gif'
                
                ffmpeg(convertInfo.file).format('gif').fps(12).complexFilter([
                    '[0:v]mpdecimate[frames]',
                    '[frames]scale=w=trunc(oh*a/2)*2:h=360[rescaled]'],
                    'rescaled').on('progress', function(progress) {
                    document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed() + '%';
                    console.log('Processing: ' + progress.percent + '% done');
                    let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                    win.setProgressBar(percentage);
                }).save(finalOutput).on('end', function() {
                    document.getElementById("progressText").textContent = 'Optimising';
                    execFile(gifsicle, ['-o', OptimalOutput, '--lossy=100', '-O3', '--colors=128',finalOutput], err => {
                        console.log('Conversion Success!');
                        fs.unlink(finalOutput, function (err) {
                            if (err) throw err;
                            console.log('File deleted!');
                        });
                        successAlert('convert', '', swalColour);
                    });
                });
                console.log('gif running');
                console.log('Final output: ', finalOutput)
                lineBreak();
                convertAlert(swalColour);
            } else {
                Swal.mixin({
                    confirmButtonText: 'Next &rarr;',
                    progressSteps: ['1', '2', '3', '4', '5'],
                    backdrop: swalColour.loading,
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
                            hlow: '360p',
                            low: '240p',
                        },
                        inputPlaceholder: 'Select Resolution',
                    },
                    {
                        title: 'Colour Quality',
                        text: 'Please choose the colour space of your GIF',
                        input: 'select',
                        inputOptions: {
                            High: 'High / 256',
                            Mid: 'Normal / 128',
                            Low: 'Optimised / 64',
                        },
                        inputPlaceholder: 'Select Colour Range',
                    },
                    {
                        title: 'Frame Rate',
                        text: 'Please choose your fps',
                        input: 'range',
                        inputAttributes: {
                            min: '1',
                            max: '60',
                            step: '1',
                        },
                        inputValue: 25,
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
                    },
                    {
                        title: 'Compression',
                        text: 'Please your compression rate',
                        input: 'range',
                        inputAttributes: {
                            min: '0',
                            max: '100',
                            step: '1',
                        },
                        inputValue: 50,
                    }
                ]).then((result: swalResult) => {
                    if (result.value) {
                        let rez, qual, fps, crop, compress;
                        let gifValues = [rez, qual, fps, crop, compress];
                        let i = 0;
                        for (var gifValue in gifValues){
                            gifValues[i] = result.value[i];
                            i++;
                        }
                        let reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=480[rescaled]'
                        let cRange = '--colors=128';
                        let gifCrop;

                        if (rez == 'High'){
                            reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=1080[rescaled]';
                        } else if (rez == 'hMid'){
                            reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=720[rescaled]';
                        } else if (rez == 'hlow'){
                            reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=360[rescaled]';
                        } else if (rez == 'low'){
                            reRez = '[frames]scale=w=trunc(oh*a/2)*2:h=240[rescaled]';
                        };
        
                        let opti = true;
                        if (compress == 0){
                            opti = false;
                        }
        
                        if (qual == 'High'){
                            cRange = '--colors=256';
                        } else if (qual == 'Low') {
                            cRange = '--colors=64';
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
        
                        let lossy = '--lossy=' + compress;
                        
                        let finalOutput = convertInfo.outputFile + '.gif'
                        let finalOutputName = path.parse(convertInfo.file).name + '.gif'
                        if (convertInfo.inputExt.indexOf('.gif')>=0){
                            finalOutput = convertInfo.outputFile + '-SinonConverted.gif'
                            finalOutputName = path.parse(convertInfo.file).name + '-SinonConverted.gif'
                        }
                        let OptimalOutput = convertInfo.outputFile + '_advanced.gif'
                        
                        ffmpeg(convertInfo.file).format('gif').fps(fps).complexFilter([
                            '[0:v]mpdecimate[frames]', reRez, gifCrop],
                            'cropped').on('progress', function(progress) {
                            document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed() + '%';
                            console.log('Processing: ' + progress.percent + '% done');
                            let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                            win.setProgressBar(percentage);
                        }).save(finalOutput).on('end', function(stdout, stderr) {
                            if (opti == true){
                                document.getElementById("progressText").textContent = 'Optimising';
                                execFile(gifsicle, ['-o', OptimalOutput, lossy, '-O3', cRange,finalOutput], err => {
                                    console.log('Conversion Success!');
                                    fs.unlink(finalOutput, function (err) {
                                        if (err) throw err;
                                        console.log('File deleted!');
                                    });
                                    successAlert('convert', '', swalColour);
                                });
                            } else {
                                successAlert('convert', '', swalColour);
                            }
                        });
                        console.log('gif running');
                        console.log('Final output: ', finalOutput)
                        lineBreak();
                        convertAlert(swalColour);
                    }
                })
            }
        }
    });
}

module.exports = {
    gifConvert
}