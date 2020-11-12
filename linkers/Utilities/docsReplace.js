export async function docsReplace() {
    return new Promise((resolve, reject) => {
        fs.readFile("./GUI/changelog.html", 'utf8', function(err, data){
            if (err){
                reject(err);
            }
            resolve(data);
        })
    });
};