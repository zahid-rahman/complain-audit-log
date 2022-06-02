const express = require('express');
const router = express.Router();
const httpStatus = require('http-status');
const userRouter = require('./users');
const complainRouter = require('./complain');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(httpStatus.OK).json({
    message: "Complain Audit Log API v0.1"
  })
});

router.use('/user', userRouter);
router.use('/complain', complainRouter);

module.exports = router;
