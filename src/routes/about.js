const router = require('express').Router();
const renderView = require('../utils/render-view');

router.route('/about').get((req, res) => {
  res.render('page', {
    content: renderView('about', {}),
  });
});

module.exports = router;
