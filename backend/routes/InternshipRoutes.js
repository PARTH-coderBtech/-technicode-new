const express = require("express");
const router = express.Router();

const Internship = require("../models/Internship");


/* =====================================
   CREATE INTERNSHIP
===================================== */

router.post("/add", async (req, res) => {
  try {

    const internship = await Internship.create(req.body);

    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: internship
    });

  } catch (error) {

    console.error("Create internship error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


/* =====================================
   GET ALL INTERNSHIPS
===================================== */

router.get("/all", async (req, res) => {
  try {

    const internships = await Internship.find({
      status: "Open"
    }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      data: internships
    });

  } catch (error) {

    console.error("Get internships error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


/* =====================================
   GET SINGLE INTERNSHIP
===================================== */

router.get("/:id", async (req, res) => {
  try {

    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    res.status(200).json({
      success: true,
      data: internship
    });

  } catch (error) {

    console.error("Get single internship error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


/* =====================================
   UPDATE INTERNSHIP
===================================== */

router.put("/:id", async (req, res) => {
  try {

    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      data: internship
    });

  } catch (error) {

    console.error("Update internship error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


/* =====================================
   DELETE INTERNSHIP
===================================== */

router.delete("/:id", async (req, res) => {
  try {

    const internship = await Internship.findByIdAndDelete(
      req.params.id
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully"
    });

  } catch (error) {

    console.error("Delete internship error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


module.exports = router;