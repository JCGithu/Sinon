export function docsReplace(target) {
    console.log('docs ran');
    fs.readFile("./GUI/changelog.html", 'utf8', function (data) {
        target.innerHTML = data;
    });
};