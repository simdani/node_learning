const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'index',
    message: 'simple message'
  });
});

module.exports = router;
