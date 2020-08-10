const { setNonEnumerableProperties } = require('got');

async function run_pynon() {
    //Inputs
    inputURL = document.getElementById('inputURL').value;
    downloadPath = document.getElementById('downloadfolder').value;
    order = 'extract';
    finalURL = '';
    geo = document.getElementById('geoFormat').value;
    userProxy = '';
    instaUse = document.getElementById('InstaUse').value;
    instaPass = document.getElementById('InstaPass').value;

    swalColours();

    //Reset UserProxy
    if (document.getElementById('proxyInput'.value) === undefined || document.getElementById('proxyInput'.value) === null){
        userProxy = '';
    } else {
        userProxy = document.getElementById('proxyInput'.value);
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

    function copyStringToClipboard (str) {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log('Clipboard updated')
        lineBreak();
    }
    //Python running template
    function RunningSwal(){
        Swal.fire({
            toast: true,
            title: 'Running!',
            customClass: 'swal-running',
            position: 'bottom',
            backdrop: false,
            target: document.getElementById('swalframe'),
            onOpen: () => {
                Swal.showLoading({
                    title: 'Running!',
                });
            }
        });
    }
    RunningSwal();
    function swalProgress(){
        Swal.fire({
            title: 'Downloading...',
            customClass: 'swal-size-sm',
            html: "<p id='progressText'></p>",
            backdrop: true,
            target: document.getElementById('swalframe'),
        });
    };
    //Python error template
    function pythonFail(error){
        error = error.toString().replace(instaPass, "").replace(instaUse, "");
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: "Downloader Error!",
            text: "Something went wrong. Please send error code and info.",
            backdrop: swalFail,
            toast:false,
            customClass: 'swal-size-sm',
            target: document.getElementById('swalframe'),
            showCancelButton: true,
            confirmButtonText: 'Copy Error Code',
            preConfirm: () => {
                copyStringToClipboard(error);
            },
        });
    }
    //Python success template
    function pythonPass(){
        Swal.fire({
            icon: 'success',
            title: "Download Success!",
            text: passText,
            customClass: 'swal-size-sm',
            backdrop: swalPass,
        });
    }
    //Python Live template
    function pythonLive(livestreamurl){
        console.log('This livestream URL was found:')
        console.log(livestreamurl);
        Swal.fire({
            icon: 'success',
            title: "Code found!",
            customClass: 'swal-size-sm',
            backdrop: swalPass,
            confirmButtonText: 'Copy to Clipboard',
            target: document.getElementById('swalframe'),
            preConfirm: () => {
                copyStringToClipboard(livestreamurl.replace(/(\r\n|\n|\r)/gm, "").replace(" ",""));
            }
        });
    }
    //Standard error template
    function basicError(){
        Swal.fire({
            icon: 'error',
            title: "Error!",
            text: errorText,
            customClass: 'swal-size-sm',
            backdrop: swalFail,
            target: document.getElementById('swalframe'),
        });
    }

    if (downloadPath === ''){
        console.log ('Error Code 000: No Download Path')
        errorText = "No download path given!"
        basicError();
    }

    if (inputURL.indexOf('tiktok.com')>=0){
        inputURL = inputURL.replace(/\?lang=../gm, "");
    }

    execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
        if (error) {
            console.log('Extractor error, details:')
            errorText='Looks like a proxy error. Try again or use another method to rip the video for now.'
            pythonFail(error);
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
                    backdrop: swalLoading,
                    customClass: 'swal-size-sm',
                    target: document.getElementById('swalframe'),
                    preConfirm: (dlquality) => {
                        RunningSwal();

                        var order = 'normal';
                        
                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                            if (error) {
                                console.log('Youtube Normal Download Fail');
                                console.log(error)
                                pythonFail(error);
                            }
                            else{
                                var message = stdout;
                                console.log('Normal Youtube Downloader Output:')
                                console.log(message);
                                pythonPass();
                            }
                        });
                    }
                })
            }
            //NO VIDEO FOUND ERROR
            else if (message.indexOf('Err002')>=0){
                console.log('Resulted in Error Code 002');
                errorText = "Can't see any video on this page?";
                basicError();
            }
            //SECURE VIDEO ERROR
            else if (message.indexOf('Err003')>=0){
                console.log('Resulted in Error Code 003');
                errorText ='This is a secure video, sorry!'
                basicError();
            }
            //NO URL ERROR
            else if (message.indexOf('Err004')>=0){
                console.log('Resulted in Error Code 004');
                errorText = 'No URL input!'
                basicError();
            }
            else if (message.indexOf('Err005')>=0){
                console.log('Resulted in Error Code 002');
                errorText = "Geo-restricted page";
                basicError();
            }
            //GENERIC EXTRACTOR
            else if (message.indexOf('Generic')>=0){
                finalURL = inputURL.replace(/\\\/|\/\\|\/\/|\\\\/g, "/").replace(':/','://').replace(':///','://')
                console.log('Generic URL found: ', finalURL);
                lineBreak();
                textInput = "<a>Seems like you've put in a direct file url.<br> Would you like to download?</a>";
                Swal.fire({
                    icon: 'info',
                    title: "File URL Detected",
                    html: textInput,
                    showCancelButton: true,
                    confirmButtonText: 'Download',
                    showLoaderOnConfirm: true,
                    backdrop: swalLoading,
                    customClass: 'swal-size-sm',
                    target: document.getElementById('swalframe'),
                    preConfirm: (dlquality) => {
                        RunningSwal();
                        if (finalURL.indexOf('.mp4')>=0 || finalURL.indexOf('.mp3')>=0){

                            const stream = require('stream');
                            const {promisify} = require('util');
                            const fs = require('fs');
                            const got = require('got');

                            console.log ('got to the file section and the final url is: ', finalURL);
                            name = /\/[^\/]+$/.exec(finalURL)
                            downloadPath = downloadPath.concat(name.replace('/','\\'));
                            console.log (downloadPath)

                            const pipeline = promisify(stream.pipeline);

                            (async () => {
                                try {
                                    await pipeline (
                                        got.stream(finalURL),
                                        fs.createWriteStream(downloadPath),
                                    );
                                    passText = '';
                                    pythonPass();
                                } catch (error) {
                                    console.log('Generic Download Fail');
                                    console.log(error)
                                    pythonFail(error);
                                }

                            })();
                        } else {
                            var order = 'normal';
                        
                            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                if (error) {
                                    console.log('Generic Download Fail');
                                    console.log(error)
                                    pythonFail(error);
                                }
                                else{
                                    var message = stdout;
                                    console.log('Generic Downloader Output:')
                                    console.log(message);
                                    passText = ''
                                    pythonPass();
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
                var urlwipebox = document.querySelector('input[name=urlwipe]');
                if (urlwipebox.checked == true){
                    console.log('URL Wipe applied')
                    document.getElementById('inputURL').value = '';
                }
                passText = '';
                // YOUTUBE EXTRACTOR SETTINGS
                if (message.indexOf('youtube.com')>=0) {
                    console.log('Running Youtube Download Options');
                    var finalURL = message;
                    var { value: dlquality } = Swal.fire({
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
                        backdrop: swalLoading,
                        customClass: 'swal-size-sm',
                        target: document.getElementById('swalframe'),
                        preConfirm: (dlquality) => {

                            if (dlquality === 'normal') {
                                
                                RunningSwal();

                                var order = 'normal';
                                
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Youtube Normal Download Fail');
                                        console.log(error)
                                        pythonFail(error);
                                    }
                                    else{
                                        var message = stdout;
                                        console.log('Normal Youtube Downloader Output:')
                                        console.log(message);
                                        pythonPass();
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
                                    backdrop: swalLoading,
                                    customClass: 'swal-size-sm',
                                    target: document.getElementById('swalframe'),
                                    preConfirm: () => {
                                        RunningSwal();
                                
                                        var order = 'high';
                                        
                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                            if (error) {
                                                console.log('High Quality Youtube Downloader Error, Details:')
                                                pythonFail(error);
                                            }
                                            else{
                                                var message = stdout;
                                                console.log('High Quality Youtube Downloader Output:')
                                                console.log(message);
                                                pythonPass();
                                            }
                                        });
                                    }
                                });
                            }
                            if (dlquality === 'live') {
                                
                                RunningSwal();

                                var order = 'live';

                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Livestream Youtube Grabber Error, Details:')
                                        pythonFail(error);
                                    }
                                    else {
                                        var livestreamurl = stdout;
                                        pythonLive(livestreamurl);
                                    }
                                });
                            }
                        }
                    });
                }
                // PARLIAMENT TV EXTRACTOR SETTINGS
                else if (message.indexOf('parliamentlive.tv')>=0) {
                    console.log('Running Parliament TV Options');
                    var finalURL = message;
                    var { value: dlquality } = Swal.fire({
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
                        backdrop: swalLoading,
                        customClass: 'swal-size-sm',
                        target: document.getElementById('swalframe'),
                        preConfirm: (dlquality) => {
                            if (dlquality === 'normal') {
                                
                                RunningSwal();
                                
                                var order = 'normal';

                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Parliament TV Download Error, Details');
                                        pythonFail(error);
                                    }
                                    else {
                                        var message = stdout;
                                        pythonPass();
                                    }
                                });
                            }
                            if (dlquality === 'live') {
                                
                                RunningSwal();

                                var order = 'live';

                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Parliament TV Live Grab Error, Details');
                                        pythonFail(error);
                                    }
                                    else {
                                        var livestreamurl = stdout.replace('\\r/','/');
                                        pythonLive(livestreamurl);
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
                    var { value: dlquality } = Swal.fire({
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
                        backdrop: swalLoading,
                        customClass: 'swal-size-sm',
                        target: document.getElementById('swalframe'),
                        preConfirm: (dlquality) => {
                            if (dlquality === 'normal') {

                                RunningSwal();

                                var order = 'normal';
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Periscope live grab error, details:')
                                        pythonFail(error);
                                        console.log('Stdout is:');
                                        console.log(stdout);
                                        lineBreak();
                                    }
                                    else {
                                        var livestreamurl = stdout;
                                        console.log('Stdout is:');
                                        console.log(stdout);
                                        lineBreak();
                                        finalURL = livestreamurl
                                        var order = 'normal';
                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                            if (error) {
                                                console.log('Periscope download error, details:')
                                                pythonFail(error);
                                            }
                                            else {
                                                var message = stdout;
                                                pythonPass();
                                            }
                                        });
                                    }
                                });
                            }
                            if (dlquality === 'live') {
                                RunningSwal();
                                var order = 'periscopefail';
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log('Periscope live grab error, details:')
                                        pythonFail(error);
                                        console.log('Stdout is:');
                                        console.log(stdout);
                                        lineBreak();
                                    }
                                    else {
                                        var livestreamurl = stdout;
                                        console.log('Stdout is:');
                                        console.log(stdout);
                                        lineBreak();
                                        pythonLive(livestreamurl);
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

                        RunningSwal();

                        var finalURL = message;
                        var order = 'normal';

                        extractorOptions = {
                            "cwd": extractorPath,
                            "maxBuffer": 1024 * 30720,
                        };

                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                            if (error) {
                                console.log ('ITV Hub download error, details:')
                                pythonFail(error);
                                console.log('stdout log here:');
                                console.log(stdout);
                                lineBreak();
                            }
                            else {
                                console.log('Success! Stdout below:');
                                console.log(stdout);
                                lineBreak();
                                pythonPass();
                            };
                        });

                    };
                }
                //BBC
                else if (message.indexOf('bbc.co.uk/iplayer')>=0 || message.indexOf('bbc.co.uk/sounds')>=0){
                    var finalURL = message;
                    if (message.indexOf('iplayer')>=0){
                        iplayerMode = '--tvmode=best'
                    } else {
                        iplayerMode = '--radiomode=best'
                    }

                    console.log('Running iPlayer Options')
                    var { value: timing } = Swal.fire({
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
                        backdrop: swalLoading,
                        customClass: 'swal-size-sm',
                        target: document.getElementById('swalframe'),
                        preConfirm: (timing) => {

                            function runiPlayer(iplayerArgs) {
                                console.log(iplayerArgs)
                                iplayerOptions = {
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
                                    pythonPass();
                                })
                            }

                            if (timing === 'whole') {
                                iplayerArgs = [
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
                                const { value: formValues } = Swal.fire({
                                    title: 'Input Start and Stop Times',
                                    html:
                                        "<a style='color:black'>Format is hh:mm:ss</a>" +
                                        '<input id="swal-input1" class="swal2-input" placeholder="00:00:00">' +
                                        '<input id="swal-input2" class="swal2-input" placeholder="00:00:00">',
                                    focusConfirm: false,
                                    customClass: 'swal-size-sm',
                                    target: document.getElementById('swalframe'),
                                    preConfirm: (formValues) => {
                                        startNumber = document.getElementById('swal-input1').value,
                                        endNumber = document.getElementById('swal-input2').value
                                        start = '--start=' + startNumber
                                        end = '--stop=' + endNumber
                                        if (start !== "") {
                                            if (end !== ""){
                                                iplayerArgs = [
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
                            backdrop: swalLoading,
                            customClass: 'swal-size-sm',
                            preConfirm: () => {
                                RunningSwal();
                                var order = 'normal';
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log ('Instagram downloader error, details:')
                                        pythonFail(error);
                                    }
                                    else{
                                        var message = stdout;
                                        console.log('Instagram extractor print out:')
                                        console.log(message)
                                        pythonPass();
                                    }
                                });
                            }
                        });      
                    }
                    else {
                        console.log('itsa story')
                        if (instaUse === '' || instaPass === ''){
                            console.log ('Error Code 006: No Instagram Details')
                            errorText = 'No instagram login details found in settings. Required for story downloads!'
                            basicError();
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: "Instagram Story found!",
                                showCancelButton: true,
                                confirmButtonText: 'Download',
                                showLoaderOnConfirm: true,
                                backdrop: swalLoading,
                                customClass: 'swal-size-sm',
                                preConfirm: () => {
                                    
                                    RunningSwal();
        
                                    var order = 'stories';

                                    var finalURL = inputURL.replace(/\/\?hl=../gm, "")
        
                                    execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                        if (error) {
                                            console.log ('Stories downloader error, details:')
                                            pythonFail(error);
                                        }
                                        else{
                                            var message = stdout;
                                            console.log('Stories extractor print out:')
                                            console.log(message)
                                            pythonPass();
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
                        backdrop: swalLoading,
                        customClass: 'swal-size-sm',
                        preConfirm: () => {
                            
                            RunningSwal();

                            var order = 'normal';

                            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, (error, stdout, stderr) => {
                                if (error) {
                                    console.log ('Generic downloader error, details:')
                                    pythonFail(error);
                                }
                                else{
                                    var message = stdout;
                                    console.log('Normal extractor print out:')
                                    console.log(message)

                                    if (message.indexOf('twitter.com')>=0) {
                                        console.log('Changed video name due to Twitter, User notified');
                                        passText = 'Please note: Twitter videos are named after the username! Some tweets are just too long for titles.'
                                        pythonPass();
                                    }
                                    else {
                                        pythonPass();
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