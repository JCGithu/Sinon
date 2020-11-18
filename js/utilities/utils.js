function copyString(str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  console.log('Clipboard updated');
  lineBreak();
}

function swalColours() {
  let darkSwitch = document.getElementById('darkswitch');
  console.log('swal colour check');
  if (darkSwitch.checked) {
    (swalColour.fail = '#232323'), (swalColour.loading = '#2c3e50'), (swalColour.pass = '#2c3e50');
  } else {
    (swalColour.fail = '#ED6A5A'), (swalColour.loading = 'rgba(0,0,0,0.4)'), (swalColour.pass = '#30bced');
  }
}

function lineBreak() {
  console.log('~=~=~=~=~=~=~=~=~=~=~=~');
}

function progressBar(progress, format) {
  if (progress.percent === undefined) {
    document.getElementById('progressText').textContent = progress.timemark.match('dd:dd:dd)');
  } else {
    if (format.indexOf('concat') >= 0) {
      progress.percent = progress.percent / (effectFile.length + 1);
    }
    if (progress.percent > 100) {
      progress.percent = 99.9;
    }
    document.getElementById('progressText').textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
    console.log('Processing: ' + progress.percent + '% done');
    let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
    win.setProgressBar(percentage);
  }
}

function docReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

module.exports = { docReady, lineBreak, progressBar, swalColours, copyString };
