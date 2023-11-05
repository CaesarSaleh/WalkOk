const data = require('./json/coordinates_tsm.json')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json(data);
});
router.get('/start', function (req, res, next) {
  const { spawn } = require('child_process');
  spawn('python', ["d:/Workspaces/hackathons/newhacks/WalkOk/project/src/app/flask_server/server.py"].concat());
});




module.exports = router;
