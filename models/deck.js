'use strict';

const path = require('path');
const fs = require('fs');

let dpath = path.join(__dirname, '../cardData/cards.json');


fs.readFile(dpath, (err, data) =>{
  if(err) return console.error(err);
  console.log("data: ", data);
})