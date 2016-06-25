'use strict';

const path = require('path');
const fs = require('fs');

let dbpath = path.join(__dirname, '../data/database.db');


exports.getAll = cb =>{
  db.all(`select * from tasks;`, cb);
}