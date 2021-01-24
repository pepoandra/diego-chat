//
const express = require('express');
var cors = require('cors')  //use this

const app = express();
app.use(cors()) //and this

const port = 8000;
const fullDict = require('./result.json');
const MAX_MSG = 20;

const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const getMsg = (inputMsg) => {
    let result = [];
    let word = inputMsg.split(' ')[-1];
    let options = [];
    while(result.length < MAX_MSG){
        for(dictWord in Object.keys(fullDict)){
            if(dictWord.split('-')[0] === word){
                options.push(dictWord.split('-')[1])
            }
        }
        if(options.length === 0){
            word = getRandomItem(Object.keys(fullDict).map(pair => pair.split('-')[0]))
        } else {
            word = getRandomItem(options);
        }
        result.push(word);
    }
    return result.join(' ');
};


app.get('/', (req, res) => {
    const { msg } = req.query;
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    });
    res.json({response: getMsg(msg)});
});

app.listen(port, () => {
    console.log(`dale que saleee x el puerto ${port}, amigl`);
});