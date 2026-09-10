const express = require("express");

const router = express.Router();

const {
  createCertificate,
  verifyCertificate,
  getAllCertificates,
  getMyCertificates,
  revokeCertificate,
} = require(
  "../controllers/certificateController"
);


// Public Route
router.get(
  "/verify/:certificateId",
  verifyCertificate
);
router.get(
  "/my-certificates",
  getMyCertificates
);

// Admin Routes

router.post(
  "/",
  createCertificate
);


router.get(
  "/",
  getAllCertificates
);


router.patch(
  "/:id/revoke",
  revokeCertificate
);


module.exports = router;