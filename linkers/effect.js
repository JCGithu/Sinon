document.getElementById('downloadtext').addEventListener('click', function(){
    dialog.showOpenDialog({
        filters: [
            { name: 'Video', extensions: ['mkv', 'avi', 'mp4', 'ts', 'm3u8','mpd','webm', 'mpg', 'flv', 'mov'] },
            { name: 'Audio', extensions: ['mp3','flac','wav','aac']},
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile', 'multiSelections'],
        title: 'Pick A File'
    }).then((data) => {
        console.log(data.filePaths)
        effectFile = data.filePaths;
        downloadFile = document.getElementById('downloadFile')
        downloadFile.value = effectFile;

        runButton = document.getElementById("runTool");

        if(downloadFile.value.length < 1){
            runButton.classList.remove('active');
        } else {
            runButton.classList.add('active');
        }
        return effectFile
    });
});

async function run_effect(){
    lineBreak();
    swalColours();
    function swalConvert(){
        Swal.fire({
            title: 'Generating...',
            customClass: 'swal-size-sm',
            html: "<p id='progressText'></p>",
            backdrop: swalLoading,
            allowOutsideClick: false,
            showConfirmButton: false,
            target: document.getElementById('swalframe'),
        });
    };
    function effectSetUp(fileSelected){
        outputFile = path.join(path.parse(fileSelected).dir, path.parse(fileSelected).name);
        inputFull = path.join(path.parse(fileSelected).dir, path.parse(fileSelected).base);
        inputExt = path.parse(fileSelected).ext
        inputDir = path.parse(fileSelected).dir
        inputName = path.parse(fileSelected).name
    }

    var e = document.getElementById("convertFormat");
    format = e.options[e.selectedIndex].value;

    function progressBar(progress){

        if (progress.percent === undefined){
            document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
        } else {
            if (format.indexOf('concat')>=0) {
                progress.percent = (progress.percent / (effectFile.length + 1));
            }
            if (progress.percent > 100) {
                progress.percent = 99.90
            }
            document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
            console.log('Processing: ' + progress.percent + '% done');
            percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
            win.setProgressBar(percentage);
        }
    }
    
    // GRABS
    async function screengrabs (){
        return new Promise ((resolve, reject) => {
            var { value: grabNum } = Swal.fire({
                icon: 'info',
                title: "How many?",
                text: "Pick a number, any number",
                input: 'range',
                inputAttributes: {
                    min: 1,
                    max: 20,
                    step: 1,
                },
                inputValue: 1,
                confirmButtonText: 'Grab!',
                showLoaderOnConfirm: true,
                backdrop: swalLoading,
                customClass: 'swal-size-sm',
                target: document.getElementById('swalframe'),
                preConfirm: (grabNum) => {
                    swalConvert();
                    effectFile.forEach(function(fileSelected){
                        effectSetUp(fileSelected);
                        ffmpeg(fileSelected).screenshots({
                            count: grabNum,
                            folder: inputDir,
                            filename: inputName + '-%d.png',
                        })
                        .on('error', function(err, stdout, stderr) {
                            effectFail(err);
                        })
                        .on('end', function(stdout, stderr) {
                            console.log('Conversion Success!');
                            resolve();
                            if (multi == false) {
                                Swal.fire({
                                    icon: 'success',
                                    title: "Screenshots taken!",
                                    customClass: 'swal-size-sm',
                                    backdrop: swalPass,
                                });
                            }
                        });
                    });
                }
            })
        });
    }
    
    // BLUR
    async function socialBlur (){
        return new Promise ((resolve, reject) => {
            var { value: ratio } = Swal.fire({
                icon: 'info',
                title: "Which ratio!",
                text: "What ratio is the original video?",
                input: 'select',
                inputOptions: {
                    vertical: 'Vertical (9x16)',
                    square: 'Square (1x1)',
                },
                inputPlaceholder: 'Select Ratio',
                confirmButtonText: 'Run!',
                showLoaderOnConfirm: true,
                backdrop: swalLoading,
                customClass: 'swal-size-sm',
                target: document.getElementById('swalframe'),
                preConfirm: (ratio) => {
                    swalConvert();
                    if (ratio === 'vertical') {
                        var cropSetting = '[pxratio_fix]crop=w=ih*(9/16)[cropped]';
                    }
                    if (ratio === 'square') {
                        var cropSetting = "[pxratio_fix]crop='if(lt(in_h,in_w),in_h,in_w):in_h'[cropped]";
                    }
                    effectFile.forEach(function(fileSelected){
                        effectSetUp(fileSelected);
                        finalOutput = outputFile + '-bgblurred.mp4'
                        console.log('Final output: ', finalOutput)
                        lineBreak();
                        ffmpeg(fileSelected)
                            .complexFilter([
                                '[0:v]scale=iw*sar:ih[pxratio_fix]',
                                cropSetting,
                                '[cropped]boxblur=20:10[blurred]',
                                '[0:v]scale=iw*sar:ih[pxratio_fix]',
                                cropSetting,
                                '[cropped]scale=-1:1080[original]',
                                '[blurred]scale=1920:-1[scaledbg]',
                                '[scaledbg]crop=1920:1080[bg]',
                                '[bg][original]overlay=(W-w)/2:(H-h)/2,crop=h=iw*9/16[end]'
                            ], 'end')
                            .format('mp4')
                            .outputOptions([
                                '-map 0:a?',
                            ])
                            .on('progress', function(progress) {
                                if (progress.percent === undefined){
                                    document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
                                }
                                else {
                                    document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
                                    percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                                    win.setProgressBar(percentage);
                                    console.log('Processing: ' + progress.percent + '% done');
                                }
                            })
                            .on('error', function(err, stdout, stderr) {
                                effectFail(err);
                            })
                            .save(finalOutput).on('end', function(stdout, stderr) {
                                console.log('Conversion Success!');
                                resolve();
                                win.setProgressBar(-1)
                                if (multi == false) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: "Conversion Success!",
                                        customClass: 'swal-size-sm',
                                        backdrop: swalPass,
                                    });
                                }
                            });
                    }
                )}
            });
        });
    }
    
    // WAVE
    async function wave(){
        return new Promise ((resolve, reject) => {
            effectFile.forEach(function(fileSelected){
                effectSetUp(fileSelected);
                finalOutput = outputFile + '-waveform.mov'
                console.log('Final output: ', finalOutput)
                lineBreak();
                swalConvert();
                ffmpeg(fileSelected).fps(25).format('mov').videoCodec('png').complexFilter([
                    'aformat=channel_layouts=mono,compand=attacks=0:points=-80/-115|-35.1/-80|-35/-35|20/20=gain=-6,showwaves=s=2000x720:mode=cline:r=25:colors=#ffffff,format=yuva420p,colorkey=0x000000:0.1:0.5[v]'],
                    'v').outputOptions([
                        '-map 0:a',
                    ]).on('progress', function(progress) {
                    if (progress.percent === undefined){
                        document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
                    } else {
                        document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
                        console.log('Processing: ' + progress.percent + '% done');
                        percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2))
                        win.setProgressBar(percentage);
                    }
                    })
                    .on('error', function(err, stdout, stderr) {
                        effectFail(err);
                    })
                    .save(finalOutput).on('end', function(stdout, stderr) {
                        console.log('Conversion Success!');
                        resolve();
                        if (multi == false) {
                            Swal.fire({
                                icon: 'success',
                                title: "Conversion Success!",
                                customClass: 'swal-size-sm',
                                backdrop: swalPass,
                            });
                            win.setProgressBar(-1)
                        }
                    });
            })
        });
    }
    
    // CONCAT
    async function concat(){
        return new Promise ((resolve, reject) => {
            let ffmpegInputs = ffmpeg();
            var getInputs = new Promise((resolve, reject) => {
                effectFile.forEach(async function(fileSelected, index, array){
                    effectSetUp(fileSelected);
                    ffmpegInputs = ffmpegInputs.input(inputFull);
                    if (index === array.length -1) resolve();
                    return ffmpegInputs
                });
            });
            getInputs.then(() => {
                console.log('Jumped')
                lineBreak();
                swalConvert();
                console.log(ffmpegInputs);
                finalOutput = outputFile + '-Sinon-Joined.mp4'
                ffmpegInputs
                    .on('progress', function(progress) {
                    progressBar(progress);
                    })
                    .on('error', function(err, stdout, stderr) {
                        effectFail(err);
                    })
                    .mergeToFile(finalOutput)
                    .outputOptions([
                        '-map 0:a?',
                    ])
                    .on('end', function(stdout, stderr) {
                        console.log('Merge Success!');
                        win.setProgressBar(-1);
                        resolve('Concat finished');
                        if (multi == false) {
                            Swal.fire({
                                icon: 'success',
                                title: "Merge Success!",
                                customClass: 'swal-size-sm',
                                backdrop: swalPass,
                            });
                        }
                    })
            });
        });
    }

    //New Wave
    async function newWave(){
        return new Promise ((resolve, reject) => {

            p5Script = document.createElement("script");
            p5SoundScript = document.createElement("script");
            waveScript = document.createElement("script");
            waveScript.type = "text/javascript";
            p5Script.type = "text/javascript";
            p5SoundScript.type = "text/javascript";

            p5Script.src = '../linkers/wave/p5.min.js';
            p5Script.id = 'p5';

            p5SoundScript.src = '../linkers/wave/p5.sound.js';
            p5SoundScript.id = 'p5sound';

            waveScript.src = '../linkers/wave/wave.js';
            waveScript.id = 'waveScript';

            document.head.appendChild(p5Script);

            p5Script.onload = p5Script.onreadystatechange = function() {
                if (!this.readyState || this.readyState == 'complete'){
                    console.log('p5 loaded')
                    document.head.appendChild(p5SoundScript);
                    p5SoundScript.onload = p5SoundScript.onreadystatechange = function() {
                        if (!this.readyState || this.readyState == 'complete'){
                            document.head.appendChild(waveScript);
                            waveScript.onload = waveScript.onreadystatechange = function() {
                                if (!this.readyState || this.readyState == 'complete'){
                                    console.log('wut wut')
                                    resolve('bloody ran init');
                                }
                            }
                        }
                    }
                }
            };
        });
    }
    
    // SINGLE
    async function singleEffect(format){
        if (format.indexOf('wave')>=0){

            /* await newWave(); */

            await wave();
        }
        if (format.indexOf('blur')>=0){
            await socialBlur();
        }
        if (format.indexOf('grabs')>=0){
            await screengrabs ();
        }
        if (format.indexOf('concat')>=0){
            await concat();
        }
    }
    
    //CUSTOM
    if (format.indexOf('custom')>=0){
            Swal.fire({
                icon: 'info',
                title: "Pick your effects",
                text: "What effects do you want to run?",
                html:
                "<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; width:100%'>" +
                    "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                        "<select id='custom_one' class='convFormat'>" +
                            "<option value='concat'>Join clips</option>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                        "</select>" +
                    "</div>" +
                    "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                        "<select id='custom_two' class='convFormat' classNamePrefix='conv'>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                        "</select>" +
                    "</div>" +
                    "<div class='select' style='width:50vw !important; margin-top: 1vh'>" +
                        "<select id='custom_three' class='convFormat' classNamePrefix='conv'>" +
                            "<option value='blank'>N/A</option>" +
                            "<option value='blur'>Social Media Blur</option>" +
                            "<option value='wave'>Generate Waveform</option>" +
                            "<option value='grabs'>Get Screengrabs</option>" +
                        "</select>" +
                    "</div>" +
                "</div>",
                confirmButtonText: 'Run!',
                showLoaderOnConfirm: true,
                backdrop: swalLoading,
                customClass: 'swal-size-sm',
                target: document.getElementById('swalframe'),
                preConfirm: (async () => {
                    var custom_get = document.getElementById("custom_one");
                    format = custom_get.options[custom_get.selectedIndex].value;
                    var custom_get = document.getElementById("custom_two");
                    custom_two = custom_get.options[custom_get.selectedIndex].value;
                    var custom_get = document.getElementById("custom_three");
                    custom_three = custom_get.options[custom_get.selectedIndex].value;
                    multi = true;
                    nextStep = false;
                    console.log ('Running effect one, code: ' + format);
                    await singleEffect(format);
                    format = custom_two
                    effectFile = [finalOutput];
                    console.log ('Running effect two, code: ' + format);
                    await singleEffect(format);
                    if (custom_three.indexOf('blank')<=0){
                        format = custom_three;
                        effectFile = [finalOutput];
                        console.log ('Running effect three, code: ' + format);
                        await singleEffect(format); 
                    }
                    Swal.fire({
                        icon: 'success',
                        title: "Merge Success!",
                        customClass: 'swal-size-sm',
                        backdrop: swalPass,
                    });
                    console.log ('Custom effect finished');
                })
            })
    } else {
        multi = false
        await singleEffect(format);
    }
};