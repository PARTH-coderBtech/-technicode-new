const express = require("express");

const router = express.Router();

const {
  sendContactMessage
} = require("../controllers/contectController");


router.post("/", sendContactMessage);


module.exports = router;
