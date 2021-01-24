const fs = require('fs');
const path = require('path');

function promiseAllP(items, block) {
    var promises = [];
    items.forEach(function(item, index) {
        promises.push( function(item, i) {
            return new Promise(function(resolve, reject) {
                return block.apply(this,[item, index, resolve, reject]);
            });
        }(item, index))
    });
    return Promise.all(promises);
}


function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) return reject(err);
            promiseAllP(filenames,
            (filename,index,resolve,reject) =>  {
                fs.readFile(path.resolve(dirname, filename), 'utf-8', function(err, content) {
                    if (err) return reject(err);
                    return resolve({filename: filename, contents: content});
                });
            })
            .then(results => {
                return resolve(results);
            })
            .catch(error => {
                return reject(error);
            });
        });
  });
}

readFiles( 'textos')
.then(files => {
    let data = '';
    let dict = {};
    const puntuacion = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const multipleSpaces = /\s\s+/g;

    files.forEach( (item, index) => {
        data += ` ${item.contents.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(puntuacion, '').replace('"', '').replace(multipleSpaces, ' ')}`
    });
    console.log(data);
    let previousWord = '';
    const arr = data.split(' ');
    for(var i = 0; i < arr.length; i++ ){
        console.log(arr[i])
        if(Object.keys(dict).includes(`${previousWord}-${arr[i]}`)){
            dict[`${previousWord}-${arr[i]}`] += 1;
        } else if(previousWord !== '' && arr[i] !== '') {
            dict[`${previousWord}-${arr[i]}`] = 1;
        } else if(arr[i] !== '') {
            previousWord = arr[i];
        }
    }
    fs.writeFileSync('./result.json', JSON.stringify(dict) , 'utf-8');
})
.catch( error => {
    console.log( error );
});