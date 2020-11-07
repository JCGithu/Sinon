function copyString(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    //el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Clipboard updated');
    lineBreak();
}
;
function swalColours() {
    let darkSwitch = document.getElementById('darkswitch');
    if (darkSwitch.checked) {
        let swalColour = { fail: '#232323', loading: '#2c3e50', pass: '#2c3e50' };
        return swalColour;
    }
    else {
        let swalColour = { fail: '#ED6A5A', loading: 'rgba(0,0,0,0.4)', pass: '#30bced' };
        return swalColour;
    }
}
;
function lineBreak() {
    console.log('~=~=~=~=~=~=~=~=~=~=~=~');
}
;
function progressBar(progress, format) {
    if (progress.percent === undefined) {
        document.getElementById("progressText").textContent = (progress.timemark).match('\d\d\:\d\d\:\d\d)');
    }
    else {
        if (format.indexOf('concat') >= 0) {
            progress.percent = (progress.percent / (effectFile.length + 1));
        }
        if (progress.percent > 100) {
            progress.percent = 99.90;
        }
        document.getElementById("progressText").textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
        console.log('Processing: ' + progress.percent + '% done');
        let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
        win.setProgressBar(percentage);
    }
}
module.exports = {
    copyString, lineBreak, swalColours, progressBar
};