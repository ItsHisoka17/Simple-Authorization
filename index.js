const express = require('express')();
(()=> {
  new (require('./src/server'))(express);
})();
