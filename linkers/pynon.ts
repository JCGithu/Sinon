import Swal from 'sweetalert2';
const { dialog } = require('electron').remote;
const { execFile } = require('child_process');
var spawn = require('child_process').spawn;

//Utils
const { lineBreak, swalColours, fs } = require('./Utilities/utils');

// Alerts
const { errorAlert } = require('./alerts/errorAlert');
const { runningAlert } = require('./alerts/runningAlert');
const { successAlert } = require('./alerts/successAlert');

document.getElementById('downloadtext').addEventListener('click', function(){
    dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: 'Pick A Download Folder'
    }).then((data) => {
        console.log(data.filePaths)
        var downloadPath = data.filePaths;
        (<HTMLInputElement>document.getElementById('inputURL')).value = downloadPath;
        var waitTimer;
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave, 5000);
    });
});
var inputText = document.getElementById("inputURL") as HTMLInputElement;
var runButton = document.getElementById("runTool");

inputText.addEventListener("keyup", function(){
    if (inputText.value.length < 1){
        runButton.classList.remove('active');
    } else {
        runButton.classList.add('active');
    };
});

async function run_pynon() {
    //Inputs
    let inputURL = (<HTMLInputElement>document.getElementById('inputURL')).value;
    let downloadPath = (<HTMLInputElement>document.getElementById('downloadFolder')).value;
    let order = 'extract';
    let finalURL = '';
    let geo = (<HTMLInputElement>document.getElementById('geoFormat')).value;
    let userProxy = '';
    let instaUse = (<HTMLInputElement>document.getElementById('InstaUse')).value;
    let instaPass = (<HTMLInputElement>document.getElementById('InstaPass')).value;
    
    let proxyInput = document.getElementById('proxyInput') as HTMLInputElement;
    

    let swalColour = swalColours();

    //Reset UserProxy
    if (proxyInput.value === undefined || proxyInput.value === null){
        userProxy = '';
    } else {
        userProxy = proxyInput.value;
    }

    console.log('Function has started!')
    function inputCheck(inputURL, downloadPath, order, finalURL, userProxy, geo){
        console.log('Input URl: ' + inputURL)
        console.log('Download Path: ' + downloadPath)
        console.log('Pynon orders: ' + order)
        console.log('Extractor path is: ' + extractorPath)
        console.log('Geo is: ' + geo)
        if (userProxy == ''){
            console.log('No user proxy inputted')
        } else {
            console.log('User Proxy is: ' + userProxy)
        }
        if (instaUse == ''){
            console.log('No Instagram username inputted')
        } else {
            console.log('Instagram username is: ' + instaUse)
        }
        if (instaPass == ''){
            console.log('No instagram password inputted')
        } else {
            console.log('Instagram password is: ' + instaPass)
        }
    }
    inputCheck(inputURL, downloadPath, order, finalURL, userProxy, geo);
    lineBreak();

    function swalProgress(){
        Swal.fire({
            title: 'Downloading...',
            html: "<p id='progressText'></p>",
            backdrop: true,
            target: document.getElementById('swalframe'),
        });
    };

    if (downloadPath === ''){
        console.log ('Error Code 000: No Download Path')
        errorAlert('','basic', "No download path given!", swalColour);
    }

    if (inputURL.indexOf('tiktok.com')>=0){
        inputURL = inputURL.replace(/\?lang=../gm, "");
    }
    if (inputURL.indexOf('youtu.be/')>=0){
        inputURL = inputURL.replace("youtu.be/", "youtube.com/watch?v=");
    };

    execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
        if (error) {
            errorAlert(error, 'proxy', 'Looks like a proxy error. Try again or use another method to rip the video for now.', swalColour);
        }
        else {
            console.log('Initial output from Extractor is:')
            console.log(stdout)
            lineBreak();
            const message = stdout

            //NOT COVERED ERROR
            if (message.indexOf('Err001')>=0){
                console.log('Resulted in Error Code 001');
                finalURL = inputURL
                Swal.fire({
                    icon: 'error',
                    title: "Site not covered yet",
                    text: "Please forward the name of the site so it can be added. Meanwhile you can try running it through a generic extractor.",
                    showCancelButton: true,
                    confirmButtonText: 'Download',
                    showLoaderOnConfirm: true,
                    toast: false,
                    backdrop: swalColour.loading,
                    target: document.getElementById('swalframe'),
                    preConfirm: (dlquality) => {
                        runningAlert();

                        var order = 'normal';
                        
                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                            if (error) {
                                console.log('Youtube Normal Download Fail');
                                errorAlert(error, 'download', '', swalColour);
                            }
                            else{
                                var message = stdout;
                                console.log('Normal Youtube Downloader Output:')
                                console.log(message);
                                successAlert('','', swalColour);
                            }
                        });
                    }
                })
            }
            //NO VIDEO FOUND ERROR
            else if (message.indexOf('Err002')>=0){
                console.log('Resulted in Error Code 002');
                errorAlert('', 'basic', "Can't see any video on this page?", swalColour);
            }
            //SECURE VIDEO ERROR
            else if (message.indexOf('Err003')>=0){
                console.log('Resulted in Error Code 003');
                errorAlert('', 'basic', 'This is a secure video, sorry!', swalColour);
            }
            //NO URL ERROR
            else if (message.indexOf('Err004')>=0){
                console.log('Resulted in Error Code 004');
                errorAlert('', 'basic', 'No URL input!', swalColour);
            }
            else if (message.indexOf('Err005')>=0){
                console.log('Resulted in Error Code 002');
                errorAlert('', 'basic', "Geo-restricted page", swalColour);
            }
            //GENERIC EXTRACTOR
            else if (message.indexOf('Generic')>=0){
                finalURL = inputURL.replace(/\\\/|\/\\|\/\/|\\\\/g, "/").replace(':/','://').replace(':///','://')
                console.log('Generic URL found: ', finalURL);
                lineBreak();
                let textInput = "<a>Seems like you've put in a direct file url.<br> Would you like to download?</a>";
                Swal.fire({
                    icon: 'info',
                    title: "File URL Detected",
                    html: textInput,
                    showCancelButton: true,
                    confirmButtonText: 'Download',
                    showLoaderOnConfirm: true,
                    backdrop: swalColour.loading,
                    target: document.getElementById('swalframe'),
                    preConfirm: (dlquality) => {
                        runningAlert();
                        if (finalURL.indexOf('.mp4')>=0 || finalURL.indexOf('.mp3')>=0){

                            const stream = require('stream');
                            const {promisify} = require('util');
                            const got = require('got');

                            console.log ('got to the file section and the final url is: ', finalURL);
                            let fileName = /\/[^\/]+$/.exec(finalURL)
                            downloadPath = downloadPath.concat(fileName.toString().replace('/','\\'));
                            console.log (downloadPath)

                            const pipeline = promisify(stream.pipeline);

                            (async () => {
                                try {
                                    await pipeline (
                                        got.stream(finalURL),
                                        fs.createWriteStream(downloadPath),
                                    );
                                    successAlert('','', swalColour);
                                } catch (error) {
                                    errorAlert(error, 'download', '', swalColour);
                                }

                            })();
                        } else {
                            var order = 'normal';
                        
                            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                if (error) {
                                    errorAlert(error, 'download', '', swalColour);
                                }
                                else{
                                    var message = stdout;
                                    console.log('Generic Downloader Output:')
                                    console.log(message);
                                    successAlert('','', swalColour);
                                }
                            });
                        }
                    }
                })
            }
            //RUNNING!
            else {
                console.log ('No errors so far, Extractor has produced:')
                console.log (stdout);
                lineBreak();

                //Set input blank
                var urlwipebox = document.querySelector('input[name=urlwipe]') as HTMLInputElement;
                if (urlwipebox.checked == true){
                    console.log('URL Wipe applied');
                    (<HTMLInputElement>document.getElementById('inputURL')).value = '';
                }
                // YOUTUBE EXTRACTOR SETTINGS
                if (message.indexOf('youtube.com')>=0) {
                    console.log('Running Youtube Download Options');
                    var finalURL = message;
                    if (finalURL.indexOf('&list=')>=0) {
                        console.log('Playlist found');
                        Swal.fire({
                            icon: 'info',
                            title: 'Playlist URL',
                            text: 'Seems like this URL is part of a playlist, do you want to download the whole playlist?',
                            showCancelButton: true,
                            backdrop: swalColour.loading,
                            target: document.getElementById('swalframe'),
                            confirmButtonText: 'Single Video',
                            cancelButtonText: 'Playlist',
                        }).then((result) => {
                            if (result.value) {
                                finalURL = finalURL.replace(/&list=.*/g,'');
                            }
                            Swal.fire({
                                icon: 'success',
                                title: "Video found!",
                                text: "Nice one, now click download to grab this clip",
                                input: 'select',
                                inputOptions: {
                                    normal: 'Normal Resolution',
                                    high: 'High Resolution',
                                    live: 'Grab .m3u8 Code'
                                },
                                inputPlaceholder: 'Select Quality',
                                showCancelButton: true,
                                confirmButtonText: 'Download',
                                showLoaderOnConfirm: true,
                                backdrop: swalColour.loading,
                                target: document.getElementById('swalframe'),
                                preConfirm: (dlquality) => {
                                        if (dlquality === 'normal') {
                                            runningAlert();
                                            var order = 'normal';
                
                                            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                                if (error) {
                                                    console.log('Youtube Normal Download Fail');
                                                    errorAlert(error, 'download', '', swalColour);
                                                }
                                                else{
                                                    var message = stdout;
                                                    console.log('Normal Youtube Downloader Output:')
                                                    console.log(message);
                                                    successAlert('','', swalColour);
                                                }
                                            });
                                        }
                                        if (dlquality === 'high') {
                
                                            Swal.fire({
                                                icon: 'info',
                                                title: "Heads Up",
                                                text: "High quality downloads can take roughly 4x longer to process. Only use when needed.",
                                                showCancelButton: true,
                                                confirmButtonText: 'Continue',
                                                showLoaderOnConfirm: true,
                                                backdrop: swalColour.loading,
                                                target: document.getElementById('swalframe'),
                                                preConfirm: () => {
                                                    runningAlert();
                                            
                                                    var order = 'high';
                                                    
                                                    execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                                        if (error) {
                                                            console.log('High Quality Youtube Downloader Error, Details:')
                                                            errorAlert(error, 'download', '', swalColour);
                                                        }
                                                        else{
                                                            var message = stdout;
                                                            console.log('High Quality Youtube Downloader Output:')
                                                            console.log(message);
                                                            successAlert('','', swalColour);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        if (dlquality === 'live') {
                                            runningAlert();
                                            var order = 'live';
                                            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                                if (error) {
                                                    console.log('Livestream Youtube Grabber Error, Details:')
                                                    errorAlert(error, 'download', '', swalColour);
                                                }
                                                else {
                                                    successAlert('live', stdout, swalColour);
                                                }
                                            });
                                        }
                                    }
                                }
                            );
                        });
                    }
                }
                // PARLIAMENT TV EXTRACTOR SETTINGS
                else if (message.indexOf('parliamentlive.tv')>=0) {
                    console.log('Running Parliament TV Options');
                    var finalURL = message;
                    Swal.fire({
                        icon: 'success',
                        title: "Video found!",
                        text: "Nice one, get .m3u8 url or download",
                        input: 'select',
                        inputOptions: {
                            live: 'Grab .m3u8 Code',
                            normal: 'Download Past Stream',
                        },
                        inputPlaceholder: 'Select Quality',
                        confirmButtonText: 'Run!',
                        showLoaderOnConfirm: true,
                        backdrop: swalColour.loading,
                        target: document.getElementById('swalframe'),
                        preConfirm: (dlquality) => {
                            if (dlquality === 'normal') {
                                
                                runningAlert();
                                
                                var order = 'normal';

                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Parliament TV Download Error, Details');
                                        errorAlert(error, 'download', '', swalColour);
                                    }
                                    else {
                                        var message = stdout;
                                        successAlert('','', swalColour);
                                    }
                                });
                            }
                            if (dlquality === 'live') {
                                
                                runningAlert();

                                var order = 'live';

                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Parliament TV Live Grab Error, Details');
                                        errorAlert(error, 'download', '', swalColour);
                                    }
                                    else {
                                        var livestreamurl = stdout.replace('\\r/','/');
                                        successAlert('live', livestreamurl, swalColour);
                                    }
                                });
                            }
                        }
                    });
                }
                //PERISCOPE
                else if (message.indexOf('pscp.tv')>=0) {
                    console.log('Periscope options running')
                    var finalURL = message;
                    Swal.fire({
                        icon: 'success',
                        title: "Video found!",
                        text: "Nice one, get .m3u8 url or download",
                        input: 'select',
                        inputOptions: {
                            live: 'Grab .m3u8 Code',
                            normal: 'Download Past Stream',
                        },
                        inputPlaceholder: 'Select Quality',
                        confirmButtonText: 'Run!',
                        showLoaderOnConfirm: true,
                        backdrop: swalColour.loading,
                        target: document.getElementById('swalframe'),
                        preConfirm: (dlquality) => {
                            if (dlquality === 'normal') {
                                runningAlert();
                                console.log('final url is ' + finalURL);
                                var order = 'normal';
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Periscope live grab error, details:');
                                        error = error + stdout;
                                        errorAlert(error, 'download', '', swalColour);
                                        console.log('Stdout is:');
                                        console.log(stdout);
                                        lineBreak();
                                    }
                                    else {
                                        var message = stdout;
                                        successAlert('','', swalColour);
                                    }
                                });
                            }
                            if (dlquality === 'live') {
                                runningAlert();
                                var order = 'periscopefail';
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        errorAlert(error + stdout, 'download', '', swalColour);
                                        lineBreak();
                                    }
                                    else {
                                        successAlert('live', stdout, swalColour);
                                        lineBreak();
                                    }
                                });
                            }
                        }
                    });
                }
                //ITV
                else if (message.indexOf('itv.com')>=0){
                    if (message.indexOf('hub')>=0){
                        console.log('Running ITV Hub Options')

                        runningAlert();

                        var finalURL = message;
                        var order = 'normal';

                        let extractorOptions = {
                            "cwd": extractorPath,
                            "maxBuffer": 1024 * 30720,
                        };

                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                            if (error) {
                                console.log ('ITV Hub download error, details:')
                                errorAlert(error + stdout, 'download', '', swalColour);
                                console.log('stdout log here:');
                                console.log(stdout);
                                lineBreak();
                            }
                            else {
                                console.log('Success! Stdout below:');
                                console.log(stdout);
                                lineBreak();
                                successAlert('','', swalColour);
                            };
                        });

                    };
                }
                //BBC
                else if (message.indexOf('bbc.co.uk/iplayer')>=0 || message.indexOf('bbc.co.uk/sounds')>=0){
                    var finalURL = message;
                    let iplayerMode = '--radiomode=best';
                    if (message.indexOf('iplayer')>=0){
                        let iplayerMode = '--tvmode=best'
                    };
                    console.log('Running iPlayer Options');
                    Swal.fire({
                        icon: 'success',
                        title: "Found!",
                        text: "Nice one, do you want the whole show or a segment?",
                        input: 'select',
                        inputOptions: {
                            whole: 'Whole Episode',
                            clip: 'Clip a Segment',
                        },
                        inputPlaceholder: 'Select',
                        showCancelButton: true,
                        confirmButtonText: 'Download',
                        showLoaderOnConfirm: true,
                        backdrop: swalColour.loading,
                        target: document.getElementById('swalframe'),
                        preConfirm: (timing) => {

                            function runiPlayer(iplayerArgs) {
                                console.log(iplayerArgs)
                                let iplayerOptions = {
                                    "maxBuffer": 1024 * 30720,
                                    'shell': true,
                                };
                                const iPlay = spawn('get_iplayer', iplayerArgs, iplayerOptions);

                                document.getElementById("progressText").textContent = '...'

                                iPlay.stdout.on('data', function (data) {
                                    console.log((data.toString()).match(/(\d+.\d)%/g));
                                    if (data.toString() == null) {
                                        document.getElementById("progressText").textContent = '...'
                                    } else {
                                        document.getElementById("progressText").textContent = (""+(""+ (data.toString()).match(/(\d+.\d)%/g)).replace(/\.0/g, '')).replace(/null/g,'');
                                    }
                                });
                                iPlay.stderr.on('data', function (data) {
                                    console.log('stderr: ' + data.toString());
                                });
                                iPlay.on('close', (code) => {
                                    console.log('Success!');
                                    lineBreak();
                                    successAlert('','', swalColour);
                                })
                            }

                            if (timing === 'whole') {
                                let iplayerArgs = [
                                    '--force',
                                    '--overwrite',
                                    '--log-progress',
                                    iplayerMode,
                                    '--output', downloadPath,
                                    finalURL
                                ]
                                swalProgress();
                                runiPlayer(iplayerArgs);
                            }
                            if (timing === 'clip') {
                                Swal.fire({
                                    title: 'Input Start and Stop Times',
                                    html:
                                        "<a style='color:black'>Format is hh:mm:ss</a>" +
                                        '<input id="swal-input1" class="swal2-input" placeholder="00:00:00">' +
                                        '<input id="swal-input2" class="swal2-input" placeholder="00:00:00">',
                                    focusConfirm: false,
                                    target: document.getElementById('swalframe'),
                                    preConfirm: (formValues) => {
                                        let startNumber = (<HTMLInputElement>document.getElementById('swal-input1')).value,
                                        endNumber = (<HTMLInputElement>document.getElementById('swal-input2')).value,
                                        start = '--start=' + startNumber,
                                        end = '--stop=' + endNumber
                                        if (start !== "") {
                                            if (end !== ""){
                                                let iplayerArgs = [
                                                    '--force',
                                                    '--overwrite',
                                                    '--log-progress',
                                                    iplayerMode,
                                                    start, end,
                                                    '--output', downloadPath,
                                                    finalURL
                                                ]
                                                swalProgress();
                                                runiPlayer(iplayerArgs);
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    });
                }
                //Instagram
                else if (message.indexOf('instagram.com')>=0){
                    var finalURL = message;
                    if (message.indexOf('/p/')>=0){
                        console.log('itsa post')
                        Swal.fire({
                            icon: 'success',
                            title: "Instagram Post",
                            text: 'Click below to download',
                            showCancelButton: true,
                            confirmButtonText: 'Download',
                            showLoaderOnConfirm: true,
                            backdrop: swalColour.loading,
                            preConfirm: () => {
                                runningAlert();
                                var order = 'normal';
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log ('Instagram downloader error, details:')
                                        errorAlert(error, 'download', '', swalColour);
                                    }
                                    else{
                                        var message = stdout;
                                        console.log('Instagram extractor print out:')
                                        console.log(message)
                                        successAlert('','', swalColour);
                                    }
                                });
                            }
                        });      
                    }
                    else {
                        console.log('itsa story')
                        if (instaUse === '' || instaPass === ''){
                            console.log ('Error Code 006: No Instagram Details')
                            errorAlert('', 'basic', 'No instagram login details found in settings. Required for story downloads!', swalColour);
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: "Instagram Story found!",
                                showCancelButton: true,
                                confirmButtonText: 'Download',
                                showLoaderOnConfirm: true,
                                backdrop: swalColour.loading,
                                preConfirm: () => {
                                    
                                    runningAlert();
        
                                    var order = 'stories';

                                    var finalURL = inputURL.replace(/\/\?hl=../gm, "")
        
                                    execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                        if (error) {
                                            console.log ('Stories downloader error, details:')
                                            errorAlert(error, 'download', '', swalColour);
                                        }
                                        else{
                                            var message = stdout;
                                            console.log('Stories extractor print out:')
                                            console.log(message)
                                            successAlert('','', swalColour);
                                        }
                                    });
                                }
                            });
                        }      
                    }
                }
                //EVERYTHING ELSE
                else {
                    var finalURL = message;
                    console.log('No specifications found, Generic Downloader selected')
                    
                    Swal.fire({
                        icon: 'success',
                        title: "Video found!",
                        showCancelButton: true,
                        confirmButtonText: 'Download',
                        showLoaderOnConfirm: true,
                        backdrop: swalColour.loading,
                        preConfirm: () => {
                            
                            runningAlert();

                            var order = 'normal';

                            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                if (error) {
                                    console.log ('Generic downloader error, details:')
                                    errorAlert(error, 'download', '', swalColour);
                                }
                                else{
                                    var message = stdout;
                                    console.log('Normal extractor print out:')
                                    console.log(message)

                                    if (message.indexOf('twitter.com')>=0) {
                                        console.log('Changed video name due to Twitter, User notified');
                                        let passText = 'Please note: Twitter videos are named after the username! Some tweets are just too long for titles.'
                                        successAlert('', passText, swalColour);
                                    }
                                    else {
                                        successAlert('','', swalColour);
                                    }
                                }
                            });
                        }
                    });      
                }
            }
        }
    });
};