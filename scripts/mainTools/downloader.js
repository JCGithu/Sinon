//Utils
const { lineBreak, swalColours, URLwipe } = require('../utilities/utils');
const { settingSave } = require('../utilities/storage');
const { execFile } = require('child_process');
const spawn = require('child_process').spawn;
const stream = require('stream');
const { promisify } = require('util');

const extractorPath = path.join(__dirname, '/../../engine/dist/extractor');
const extractorOptions = {
  cwd: extractorPath,
};
versionInfo.extractorPath = extractorPath;

// Alerts
const errorAlert = require('../alerts/errorAlert');
const runningAlert = require('../alerts/runningAlert');
const successAlert = require('../alerts/successAlert');
const convertAlert = require('../alerts/convertAlert');

const inputDetails = require('../downloader/inputDetails');
const gateKeeper = require('../downloader/gateKeeper');

//Downloaders
const down_bbc = require('../downloader/scrapers/down_bbc');
const down_file = require('../downloader/scrapers/down_file');
const down_generic = require('../downloader/scrapers/down_generic');
const down_insta = require('../downloader/scrapers/down_insta');
const down_parliament = require('../downloader/scrapers/down_parliament');
const down_periscope = require('../downloader/scrapers/down_periscope');
const down_skip = require('../downloader/scrapers/down_skip');
const down_youtube = require('../downloader/scrapers/down_youtube');
const down_mp4scrape = require('../downloader/scrapers/down_mp4scrape');

async function downloader() {
  //Inputs
  swalColours();
  const input = inputDetails();

  if (input.path === '') {
    errorAlert('', 'basic', 'No download path given!', swalColour);
  }

  gateKeeper(input).then((data) => {
    if (data == false){
      errorAlert('', 'basic', "Couldn't connect to URL!", swalColour);
    }
    let category = ['generic','file', 'skip', 'youtube', 'instagram', 'periscope', 'parliament', 'bbc', 'mp4scrape'];
    let versions = [
      down_generic,
      down_file,
      down_skip,
      down_youtube,
      down_insta,
      down_periscope,
      down_parliament,
      down_bbc,
      down_mp4scrape
    ];
    for (let i = 0; i < category.length; i++) {
      if (data.category == category[i]) {
        versions[i](data, extractorOptions);
      }
    }
    URLwipe();
  });
}

module.exports = downloader;
