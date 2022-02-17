const express = require('express');
const usersRouter = require("./user");
const carRouter = require("./car");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Home')
});

router.use('/user', usersRouter);
router.use('/car', carRouter);

module.exports = router;
