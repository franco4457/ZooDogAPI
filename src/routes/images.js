require("dotenv").config();
const { Router } = require("express");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const multerImages  = require("../helpers/multerImages.js");

const {
  SV_HOST,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const imgroute = Router();

imgroute.post("/", multerImages.single("image"), async (req, res) => {
  // const pathImage= `${SV_HOST}/images/${req.file.filename}`
  try {
    const imageUrl = await cloudinary.uploader.upload(req.file.path, {
      folder: "Pi-Dogs",
    });
    console.log(imageUrl);
    res.status(200).json({
      msg: "image successfully changed",
      url: imageUrl.url,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
imgroute.use("/", express.static(`${__dirname}/../images`));

module.exports = imgroute;
