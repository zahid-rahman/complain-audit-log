const express = require('express');
const router = express.Router();
const httpStatus = require('http-status');
const userRouter = require('./users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(httpStatus.OK).json({
    message: "Complain Audit Log API v0.1"
  })
});

router.use('/user', userRouter);

module.exports = router;
