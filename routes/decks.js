'use strict'

console.log("in decks");

const express = require('express');

let router = express.Router();


router.get('/', (req,res)=>{
  res.send();
})


module.exports = router;