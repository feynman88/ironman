

function log(req, res, next) {
    console.log("logging data .....");
    next();
  }
  
  module.exports = log;
  