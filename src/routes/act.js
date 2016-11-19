const router = require('express').Router();
const renderView = require('../utils/render-view');

router.route('/act').get((req, res) => {
  res.render('page', {
    content: renderView('act', {}),
  });
});

module.exports = router;
