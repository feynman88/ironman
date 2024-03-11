
const express = require ('express');
const router = express.Router();




router.get("/", (req, res) => {
    // send html file
    res.send("hello omar");
  });

  module.exports = router;