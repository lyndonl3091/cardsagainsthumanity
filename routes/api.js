'use strict'

const express = require('express');

let router = express.Router();

router.get('/', (req,res)=>{
  //let samurai = ['samauri1', 'samauri2','samauri3','samauri4'];
  res.send();
})


module.exports = router;