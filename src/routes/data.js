const router = require('express').Router();
const renderView = require('../utils/render-view');

router.route('/data').get((req, res) => {
  res.render('page', {
    content: renderView('data', {}),
  });
});

module.exports = router;
