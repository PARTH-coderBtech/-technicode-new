const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { getProfile } = require(
  "../controllers/authController"
);
const authMiddleware = require(
  "../middleware/authMiddleware"
);
router.post('/signup', signup);
router.post('/login', login);
router.get(
  "/profile",
  authMiddleware,
  getProfile
);
module.exports = router;