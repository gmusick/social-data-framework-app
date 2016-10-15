var router = require('express').Router();
var renderView = require('../utils/render-view');

router.route('/')
.get(function(req, res){
  res.render('page', {
    content: renderView('home', {})
  });
});

module.exports = router;
