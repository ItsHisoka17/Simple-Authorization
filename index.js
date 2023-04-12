const express = require('express')();
(()=> {
  new (require('./src/server'))(express);
})();

const { generateMainPIN } = require('./src/Utils/Utils.js');
let res = generateMainPIN(20, 'mixed');
console.log(res, res.length);