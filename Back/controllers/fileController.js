"use strict";
const fs = require("fs");

const upload = async (req, res) => {
  //
  console.log("Upload is working");
  console.log(req.body.test1);
  var txt = JSON.stringify(req.body);
  console.log(txt);
  fs.writeFile("uploads/data.json", txt, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
    res.send({ text: "loading json work well" });
  });
};

const download = async (req, res) => {};

module.exports = {
  upload,
  download,
  test_get,
  test_post,
};
