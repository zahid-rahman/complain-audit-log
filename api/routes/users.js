var express = require('express');
var router = express.Router();
const httpStatus = require('http-status');

router.post('/login', (req, res) => {
  res.status(httpStatus.OK).json({
    message: "Complain Audit Log Login API"
  })
});

router.post('/register', (req, res) => {
  res.status(httpStatus.CREATED).json({
    email: req.body.email,
    username: req.body.username
  })
});

module.exports = router;
