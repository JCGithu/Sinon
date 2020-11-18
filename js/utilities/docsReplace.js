async function docsReplace() {
  fs.readFileSync('./GUI/changelog.html', 'utf-8');
}

/*
return fs.readFile('./GUI/changelog.html', 'utf-8', (err, data) => {
  return data;
});
*/

module.exports = docsReplace;
