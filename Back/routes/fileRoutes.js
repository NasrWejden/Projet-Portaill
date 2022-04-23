"use strict";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "dataset.json");
  },
});
const uploads = multer({ storage: storage });
const {
  upload,
  download,
  test_get,
  test_post,
} = require("../controllers/fileController");
router.post("/fileUpload", upload);

router.get("/download_datafile", download);
