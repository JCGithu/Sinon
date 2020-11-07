"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sweetalert2_1 = require("sweetalert2");
var dialog = require('electron').remote.dialog;
var execFile = require('child_process').execFile;
var spawn = require('child_process').spawn;
//Utils
var _a = require('./Utilities/utils'), lineBreak = _a.lineBreak, swalColours = _a.swalColours, fs = _a.fs;
// Alerts
var errorAlert = require('./alerts/errorAlert').errorAlert;
var runningAlert = require('./alerts/runningAlert').runningAlert;
var successAlert = require('./alerts/successAlert').successAlert;
document.getElementById('downloadtext').addEventListener('click', function () {
    dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: 'Pick A Download Folder'
    }).then(function (data) {
        console.log(data.filePaths);
        var downloadPath = data.filePaths;
        document.getElementById('inputURL').value = downloadPath;
        var waitTimer;
        clearTimeout(waitTimer);
        waitTimer = setTimeout(settingSave, 5000);
    });
});
var inputText = document.getElementById("inputURL");
var runButton = document.getElementById("runTool");
inputText.addEventListener("keyup", function () {
    if (inputText.value.length < 1) {
        runButton.classList.remove('active');
    }
    else {
        runButton.classList.add('active');
    }
    ;
});
function run_pynon() {
    return __awaiter(this, void 0, void 0, function () {
        function inputCheck(inputURL, downloadPath, order, finalURL, userProxy, geo) {
            console.log('Input URl: ' + inputURL);
            console.log('Download Path: ' + downloadPath);
            console.log('Pynon orders: ' + order);
            console.log('Extractor path is: ' + extractorPath);
            console.log('Geo is: ' + geo);
            if (userProxy == '') {
                console.log('No user proxy inputted');
            }
            else {
                console.log('User Proxy is: ' + userProxy);
            }
            if (instaUse == '') {
                console.log('No Instagram username inputted');
            }
            else {
                console.log('Instagram username is: ' + instaUse);
            }
            if (instaPass == '') {
                console.log('No instagram password inputted');
            }
            else {
                console.log('Instagram password is: ' + instaPass);
            }
        }
        function swalProgress() {
            sweetalert2_1.default.fire({
                title: 'Downloading...',
                html: "<p id='progressText'></p>",
                backdrop: true,
                target: document.getElementById('swalframe'),
            });
        }
        var inputURL, downloadPath, order, finalURL, geo, userProxy, instaUse, instaPass, proxyInput, swalColour;
        var _this = this;
        return __generator(this, function (_a) {
            inputURL = document.getElementById('inputURL').value;
            downloadPath = document.getElementById('downloadFolder').value;
            order = 'extract';
            finalURL = '';
            geo = document.getElementById('geoFormat').value;
            userProxy = '';
            instaUse = document.getElementById('InstaUse').value;
            instaPass = document.getElementById('InstaPass').value;
            proxyInput = document.getElementById('proxyInput');
            swalColour = swalColours();
            //Reset UserProxy
            if (proxyInput.value === undefined || proxyInput.value === null) {
                userProxy = '';
            }
            else {
                userProxy = proxyInput.value;
            }
            console.log('Function has started!');
            inputCheck(inputURL, downloadPath, order, finalURL, userProxy, geo);
            lineBreak();
            ;
            if (downloadPath === '') {
                console.log('Error Code 000: No Download Path');
                errorAlert('', 'basic', "No download path given!", swalColour);
            }
            if (inputURL.indexOf('tiktok.com') >= 0) {
                inputURL = inputURL.replace(/\?lang=../gm, "");
            }
            if (inputURL.indexOf('youtu.be/') >= 0) {
                inputURL = inputURL.replace("youtu.be/", "youtube.com/watch?v=");
            }
            ;
            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                if (error) {
                    errorAlert(error, 'proxy', 'Looks like a proxy error. Try again or use another method to rip the video for now.', swalColour);
                }
                else {
                    console.log('Initial output from Extractor is:');
                    console.log(stdout);
                    lineBreak();
                    var message = stdout;
                    //NOT COVERED ERROR
                    if (message.indexOf('Err001') >= 0) {
                        console.log('Resulted in Error Code 001');
                        finalURL = inputURL;
                        sweetalert2_1.default.fire({
                            icon: 'error',
                            title: "Site not covered yet",
                            text: "Please forward the name of the site so it can be added. Meanwhile you can try running it through a generic extractor.",
                            showCancelButton: true,
                            confirmButtonText: 'Download',
                            showLoaderOnConfirm: true,
                            toast: false,
                            backdrop: swalColour.loading,
                            target: document.getElementById('swalframe'),
                            preConfirm: function (dlquality) {
                                runningAlert();
                                var order = 'normal';
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                    if (error) {
                                        console.log('Youtube Normal Download Fail');
                                        errorAlert(error, 'download', '', swalColour);
                                    }
                                    else {
                                        var message = stdout;
                                        console.log('Normal Youtube Downloader Output:');
                                        console.log(message);
                                        successAlert('', '', swalColour);
                                    }
                                });
                            }
                        });
                    }
                    //NO VIDEO FOUND ERROR
                    else if (message.indexOf('Err002') >= 0) {
                        console.log('Resulted in Error Code 002');
                        errorAlert('', 'basic', "Can't see any video on this page?", swalColour);
                    }
                    //SECURE VIDEO ERROR
                    else if (message.indexOf('Err003') >= 0) {
                        console.log('Resulted in Error Code 003');
                        errorAlert('', 'basic', 'This is a secure video, sorry!', swalColour);
                    }
                    //NO URL ERROR
                    else if (message.indexOf('Err004') >= 0) {
                        console.log('Resulted in Error Code 004');
                        errorAlert('', 'basic', 'No URL input!', swalColour);
                    }
                    else if (message.indexOf('Err005') >= 0) {
                        console.log('Resulted in Error Code 002');
                        errorAlert('', 'basic', "Geo-restricted page", swalColour);
                    }
                    //GENERIC EXTRACTOR
                    else if (message.indexOf('Generic') >= 0) {
                        finalURL = inputURL.replace(/\\\/|\/\\|\/\/|\\\\/g, "/").replace(':/', '://').replace(':///', '://');
                        console.log('Generic URL found: ', finalURL);
                        lineBreak();
                        var textInput = "<a>Seems like you've put in a direct file url.<br> Would you like to download?</a>";
                        sweetalert2_1.default.fire({
                            icon: 'info',
                            title: "File URL Detected",
                            html: textInput,
                            showCancelButton: true,
                            confirmButtonText: 'Download',
                            showLoaderOnConfirm: true,
                            backdrop: swalColour.loading,
                            target: document.getElementById('swalframe'),
                            preConfirm: function (dlquality) {
                                runningAlert();
                                if (finalURL.indexOf('.mp4') >= 0 || finalURL.indexOf('.mp3') >= 0) {
                                    var stream = require('stream');
                                    var promisify = require('util').promisify;
                                    var got_1 = require('got');
                                    console.log('got to the file section and the final url is: ', finalURL);
                                    var fileName = /\/[^\/]+$/.exec(finalURL);
                                    downloadPath = downloadPath.concat(fileName.toString().replace('/', '\\'));
                                    console.log(downloadPath);
                                    var pipeline_1 = promisify(stream.pipeline);
                                    (function () { return __awaiter(_this, void 0, void 0, function () {
                                        var error_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 2, , 3]);
                                                    return [4 /*yield*/, pipeline_1(got_1.stream(finalURL), fs.createWriteStream(downloadPath))];
                                                case 1:
                                                    _a.sent();
                                                    successAlert('', '', swalColour);
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    error_1 = _a.sent();
                                                    errorAlert(error_1, 'download', '', swalColour);
                                                    return [3 /*break*/, 3];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })();
                                }
                                else {
                                    var order = 'normal';
                                    execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                        if (error) {
                                            errorAlert(error, 'download', '', swalColour);
                                        }
                                        else {
                                            var message = stdout;
                                            console.log('Generic Downloader Output:');
                                            console.log(message);
                                            successAlert('', '', swalColour);
                                        }
                                    });
                                }
                            }
                        });
                    }
                    //RUNNING!
                    else {
                        console.log('No errors so far, Extractor has produced:');
                        console.log(stdout);
                        lineBreak();
                        //Set input blank
                        var urlwipebox = document.querySelector('input[name=urlwipe]');
                        if (urlwipebox.checked == true) {
                            console.log('URL Wipe applied');
                            document.getElementById('inputURL').value = '';
                        }
                        // YOUTUBE EXTRACTOR SETTINGS
                        if (message.indexOf('youtube.com') >= 0) {
                            console.log('Running Youtube Download Options');
                            var finalURL = message;
                            if (finalURL.indexOf('&list=') >= 0) {
                                console.log('Playlist found');
                                sweetalert2_1.default.fire({
                                    icon: 'info',
                                    title: 'Playlist URL',
                                    text: 'Seems like this URL is part of a playlist, do you want to download the whole playlist?',
                                    showCancelButton: true,
                                    backdrop: swalColour.loading,
                                    target: document.getElementById('swalframe'),
                                    confirmButtonText: 'Single Video',
                                    cancelButtonText: 'Playlist',
                                }).then(function (result) {
                                    if (result.value) {
                                        finalURL = finalURL.replace(/&list=.*/g, '');
                                    }
                                    sweetalert2_1.default.fire({
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
                                        preConfirm: function (dlquality) {
                                            if (dlquality === 'normal') {
                                                runningAlert();
                                                var order = 'normal';
                                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                                    if (error) {
                                                        console.log('Youtube Normal Download Fail');
                                                        errorAlert(error, 'download', '', swalColour);
                                                    }
                                                    else {
                                                        var message = stdout;
                                                        console.log('Normal Youtube Downloader Output:');
                                                        console.log(message);
                                                        successAlert('', '', swalColour);
                                                    }
                                                });
                                            }
                                            if (dlquality === 'high') {
                                                sweetalert2_1.default.fire({
                                                    icon: 'info',
                                                    title: "Heads Up",
                                                    text: "High quality downloads can take roughly 4x longer to process. Only use when needed.",
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Continue',
                                                    showLoaderOnConfirm: true,
                                                    backdrop: swalColour.loading,
                                                    target: document.getElementById('swalframe'),
                                                    preConfirm: function () {
                                                        runningAlert();
                                                        var order = 'high';
                                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                                            if (error) {
                                                                console.log('High Quality Youtube Downloader Error, Details:');
                                                                errorAlert(error, 'download', '', swalColour);
                                                            }
                                                            else {
                                                                var message = stdout;
                                                                console.log('High Quality Youtube Downloader Output:');
                                                                console.log(message);
                                                                successAlert('', '', swalColour);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            if (dlquality === 'live') {
                                                runningAlert();
                                                var order = 'live';
                                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                                    if (error) {
                                                        console.log('Livestream Youtube Grabber Error, Details:');
                                                        errorAlert(error, 'download', '', swalColour);
                                                    }
                                                    else {
                                                        successAlert('live', stdout, swalColour);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                        }
                        // PARLIAMENT TV EXTRACTOR SETTINGS
                        else if (message.indexOf('parliamentlive.tv') >= 0) {
                            console.log('Running Parliament TV Options');
                            var finalURL = message;
                            sweetalert2_1.default.fire({
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
                                preConfirm: function (dlquality) {
                                    if (dlquality === 'normal') {
                                        runningAlert();
                                        var order = 'normal';
                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                            if (error) {
                                                console.log('Parliament TV Download Error, Details');
                                                errorAlert(error, 'download', '', swalColour);
                                            }
                                            else {
                                                var message = stdout;
                                                successAlert('', '', swalColour);
                                            }
                                        });
                                    }
                                    if (dlquality === 'live') {
                                        runningAlert();
                                        var order = 'live';
                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                            if (error) {
                                                console.log('Parliament TV Live Grab Error, Details');
                                                errorAlert(error, 'download', '', swalColour);
                                            }
                                            else {
                                                var livestreamurl = stdout.replace('\\r/', '/');
                                                successAlert('live', livestreamurl, swalColour);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        //PERISCOPE
                        else if (message.indexOf('pscp.tv') >= 0) {
                            console.log('Periscope options running');
                            var finalURL = message;
                            sweetalert2_1.default.fire({
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
                                preConfirm: function (dlquality) {
                                    if (dlquality === 'normal') {
                                        runningAlert();
                                        console.log('final url is ' + finalURL);
                                        var order = 'normal';
                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
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
                                                successAlert('', '', swalColour);
                                            }
                                        });
                                    }
                                    if (dlquality === 'live') {
                                        runningAlert();
                                        var order = 'periscopefail';
                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
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
                        else if (message.indexOf('itv.com') >= 0) {
                            if (message.indexOf('hub') >= 0) {
                                console.log('Running ITV Hub Options');
                                runningAlert();
                                var finalURL = message;
                                var order = 'normal';
                                var extractorOptions_1 = {
                                    "cwd": extractorPath,
                                    "maxBuffer": 1024 * 30720,
                                };
                                execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions_1, function (error, stdout, stderr) {
                                    if (error) {
                                        console.log('ITV Hub download error, details:');
                                        errorAlert(error + stdout, 'download', '', swalColour);
                                        console.log('stdout log here:');
                                        console.log(stdout);
                                        lineBreak();
                                    }
                                    else {
                                        console.log('Success! Stdout below:');
                                        console.log(stdout);
                                        lineBreak();
                                        successAlert('', '', swalColour);
                                    }
                                    ;
                                });
                            }
                            ;
                        }
                        //BBC
                        else if (message.indexOf('bbc.co.uk/iplayer') >= 0 || message.indexOf('bbc.co.uk/sounds') >= 0) {
                            var finalURL = message;
                            var iplayerMode_1 = '--radiomode=best';
                            if (message.indexOf('iplayer') >= 0) {
                                var iplayerMode_2 = '--tvmode=best';
                            }
                            ;
                            console.log('Running iPlayer Options');
                            sweetalert2_1.default.fire({
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
                                preConfirm: function (timing) {
                                    function runiPlayer(iplayerArgs) {
                                        console.log(iplayerArgs);
                                        var iplayerOptions = {
                                            "maxBuffer": 1024 * 30720,
                                            'shell': true,
                                        };
                                        var iPlay = spawn('get_iplayer', iplayerArgs, iplayerOptions);
                                        document.getElementById("progressText").textContent = '...';
                                        iPlay.stdout.on('data', function (data) {
                                            console.log((data.toString()).match(/(\d+.\d)%/g));
                                            if (data.toString() == null) {
                                                document.getElementById("progressText").textContent = '...';
                                            }
                                            else {
                                                document.getElementById("progressText").textContent = ("" + ("" + (data.toString()).match(/(\d+.\d)%/g)).replace(/\.0/g, '')).replace(/null/g, '');
                                            }
                                        });
                                        iPlay.stderr.on('data', function (data) {
                                            console.log('stderr: ' + data.toString());
                                        });
                                        iPlay.on('close', function (code) {
                                            console.log('Success!');
                                            lineBreak();
                                            successAlert('', '', swalColour);
                                        });
                                    }
                                    if (timing === 'whole') {
                                        var iplayerArgs = [
                                            '--force',
                                            '--overwrite',
                                            '--log-progress',
                                            iplayerMode_1,
                                            '--output', downloadPath,
                                            finalURL
                                        ];
                                        swalProgress();
                                        runiPlayer(iplayerArgs);
                                    }
                                    if (timing === 'clip') {
                                        sweetalert2_1.default.fire({
                                            title: 'Input Start and Stop Times',
                                            html: "<a style='color:black'>Format is hh:mm:ss</a>" +
                                                '<input id="swal-input1" class="swal2-input" placeholder="00:00:00">' +
                                                '<input id="swal-input2" class="swal2-input" placeholder="00:00:00">',
                                            focusConfirm: false,
                                            target: document.getElementById('swalframe'),
                                            preConfirm: function (formValues) {
                                                var startNumber = document.getElementById('swal-input1').value, endNumber = document.getElementById('swal-input2').value, start = '--start=' + startNumber, end = '--stop=' + endNumber;
                                                if (start !== "") {
                                                    if (end !== "") {
                                                        var iplayerArgs = [
                                                            '--force',
                                                            '--overwrite',
                                                            '--log-progress',
                                                            iplayerMode_1,
                                                            start, end,
                                                            '--output', downloadPath,
                                                            finalURL
                                                        ];
                                                        swalProgress();
                                                        runiPlayer(iplayerArgs);
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        //Instagram
                        else if (message.indexOf('instagram.com') >= 0) {
                            var finalURL = message;
                            if (message.indexOf('/p/') >= 0) {
                                console.log('itsa post');
                                sweetalert2_1.default.fire({
                                    icon: 'success',
                                    title: "Instagram Post",
                                    text: 'Click below to download',
                                    showCancelButton: true,
                                    confirmButtonText: 'Download',
                                    showLoaderOnConfirm: true,
                                    backdrop: swalColour.loading,
                                    preConfirm: function () {
                                        runningAlert();
                                        var order = 'normal';
                                        execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                            if (error) {
                                                console.log('Instagram downloader error, details:');
                                                errorAlert(error, 'download', '', swalColour);
                                            }
                                            else {
                                                var message = stdout;
                                                console.log('Instagram extractor print out:');
                                                console.log(message);
                                                successAlert('', '', swalColour);
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                console.log('itsa story');
                                if (instaUse === '' || instaPass === '') {
                                    console.log('Error Code 006: No Instagram Details');
                                    errorAlert('', 'basic', 'No instagram login details found in settings. Required for story downloads!', swalColour);
                                }
                                else {
                                    sweetalert2_1.default.fire({
                                        icon: 'success',
                                        title: "Instagram Story found!",
                                        showCancelButton: true,
                                        confirmButtonText: 'Download',
                                        showLoaderOnConfirm: true,
                                        backdrop: swalColour.loading,
                                        preConfirm: function () {
                                            runningAlert();
                                            var order = 'stories';
                                            var finalURL = inputURL.replace(/\/\?hl=../gm, "");
                                            execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                                if (error) {
                                                    console.log('Stories downloader error, details:');
                                                    errorAlert(error, 'download', '', swalColour);
                                                }
                                                else {
                                                    var message = stdout;
                                                    console.log('Stories extractor print out:');
                                                    console.log(message);
                                                    successAlert('', '', swalColour);
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
                            console.log('No specifications found, Generic Downloader selected');
                            sweetalert2_1.default.fire({
                                icon: 'success',
                                title: "Video found!",
                                showCancelButton: true,
                                confirmButtonText: 'Download',
                                showLoaderOnConfirm: true,
                                backdrop: swalColour.loading,
                                preConfirm: function () {
                                    runningAlert();
                                    var order = 'normal';
                                    execFile(ExtractorSet, [inputURL, downloadPath, order, finalURL, geo, userProxy, ffmpegPath, instaUse, instaPass], extractorOptions, function (error, stdout, stderr) {
                                        if (error) {
                                            console.log('Generic downloader error, details:');
                                            errorAlert(error, 'download', '', swalColour);
                                        }
                                        else {
                                            var message = stdout;
                                            console.log('Normal extractor print out:');
                                            console.log(message);
                                            if (message.indexOf('twitter.com') >= 0) {
                                                console.log('Changed video name due to Twitter, User notified');
                                                var passText = 'Please note: Twitter videos are named after the username! Some tweets are just too long for titles.';
                                                successAlert('', passText, swalColour);
                                            }
                                            else {
                                                successAlert('', '', swalColour);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
            return [2 /*return*/];
        });
    });
}
;
//# sourceMappingURL=pynon.js.map