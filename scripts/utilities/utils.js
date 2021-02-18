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
  let darkMode = document.getElementById('darkMode');
  if (darkMode.checked) {
    (swalColour.fail = '#232323'), (swalColour.loading = '#2c3e50'), (swalColour.pass = '#2c3e50');
  } else {
    (swalColour.fail = '#ED6A5A'), (swalColour.loading = 'rgba(0,0,0,0.4)'), (swalColour.pass = '#30bced');
  }
}

function lineBreak() {
  console.log('~=~=~=~=~=~=~=~=~=~=~=~');
}

function progressBar(progress, format, targetFiles) {
  let progressText = document.getElementById('progressText');
  if (progress.percent === undefined) {
    progressText.textContent = progress.timemark.match('dd:dd:dd)');
  } else {
    if (format.indexOf('concat') >= 0) {
      progress.percent = progress.percent / targetFiles.length;
    }
    if (progress.percent >= 100) {
      progress.percent = 99.9;
    }

    if (progressText) {
      progressText.textContent = (Math.round(progress.percent * 100) / 100).toFixed(1) + '%';
      console.log('Processing: ' + Math.floor(progress.percent) + '% done');
      let percentage = parseFloat((Math.round(progress.percent) / 100).toFixed(2));
      win.setProgressBar(percentage);
    }
  }
}

function docReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function URLwipe() {
  if (document.getElementById('urlWipe').checked) {
    console.log('URL Wipe applied');
    document.getElementById('inputURL').value = '';
  }
}

const axios = require('axios');

async function versionChecker() {
  return axios.get('http://colloquial.studio/sinondata.json').then(async (response) => {
    let element = document.getElementById('ver');
    if (element.innerHTML !== response.data.version) {
      element.style = 'color:var(--hover)';
      let docs = document.getElementById('documentation');
      let docText =
        `<h4 style="color:var(--hover)">// Current version of Sinon is ${response.data.version}</h4>` + docs.innerHTML;
      docs.innerHTML = docText;
    }
  });
}

module.exports = { docReady, lineBreak, progressBar, swalColours, copyString, URLwipe, versionChecker };
