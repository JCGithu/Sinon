//Utils
const { lineBreak, swalColours, URLwipe } = require('../utilities/utils');
const { settingSave } = require('../utilities/storage');
const { execFile } = require('child_process');
const spawn = require('child_process').spawn;
const stream = require('stream');
const { promisify } = require('util');
const got = require('got');

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
const { emit } = require('process');

const sqlite3 = require('sqlite3').verbose();
const { knex } = require('../utilities/utils');

//Downloaders
const down_bbc = require('../downloader/scrapers/down_bbc');
const down_file = require('../downloader/scrapers/down_file');
const down_generic = require('../downloader/scrapers/down_generic');
const down_insta = require('../downloader/scrapers/down_insta');
const down_parliament = require('../downloader/scrapers/down_parliament');
const down_periscope = require('../downloader/scrapers/down_periscope');
const down_skip = require('../downloader/scrapers/down_skip');
const down_youtube = require('../downloader/scrapers/down_youtube');

async function downloader() {
  //Inputs
  swalColours();
  const input = inputDetails();

  if (input.path === '') {
    errorAlert('', 'basic', 'No download path given!', swalColour, '');
  }

  gateKeeper(input).then((data) => {
    //IDEA: Function that pulls all catagory titles from db rather than listing
    let category = ['generic', 'file', 'skip', 'youtube', 'instagram', 'periscope', 'parliament', 'bbc'];
    let versions = [
      down_generic,
      down_file,
      down_skip,
      down_youtube,
      down_insta,
      down_periscope,
      down_parliament,
      down_bbc,
    ];
    for (let i = 0; i < category.length; i++) {
      if (data.category == category[i]) {
        console.log(`down_${category[i]}`);
        versions[i](data, extractorOptions);
      }
    }
    lineBreak();
    URLwipe();
  });
}

module.exports = downloader;
