const videoConvert = require('../converters/video.js');
const audioConvert = require('../converters/audio.js');
const gifConvert = require('../converters/gif.js');

const { swalColours, lineBreak } = require('../utilities/utils.js');

async function run_convert(targetFiles) {
  lineBreak();
  swalColours();
  var convertFile = document.getElementById('downloadFile').value;
  var e = document.getElementById('convertFormat');
  var fileInfo = [];

  targetFiles.forEach(function (targetFile) {
    let out = path.join(path.parse(targetFile).dir, path.parse(targetFile).name);
    let file = {
      input: targetFile,
      output: out,
      ext: path.parse(targetFile).ext,
    };
    fileInfo.push(file);
  });

  let convertInfo = {
    targets: fileInfo,
    format: e.options[e.selectedIndex].value,
  };

  console.log('Converter running');
  console.info(convertInfo);

  eval(convertInfo.format + 'Convert(convertInfo, swalColour)');
}

module.exports = run_convert;
