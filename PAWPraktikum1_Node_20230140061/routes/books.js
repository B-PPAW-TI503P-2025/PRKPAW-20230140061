const express = require('express');
const router = express.Router();

// Placeholder routes for books
router.get('/', (req, res) => {
  res.json({ message: 'Books endpoint' });
});

module.exports = router;
