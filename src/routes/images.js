require("dotenv").config()
const {Router} = require('express');
const express = require('express');
const multer = require('multer');
const {extname} = require('path');

const {SV_HOST}=process.env

const imgroute=Router()

const MIMETYPES = ["image/jpg", "image/jpeg", "image/png"];

const multerImages=multer({
    storage: multer.diskStorage({
        destination: `${__dirname}/../images`,
        filename: (req, file, cb)=> {
            const ext = extname(file.originalname);
            const filename=file.originalname.split(ext)[0]+`-${Date.now()}${ext}`
            cb(null, filename)
        }
    }),
    fileFilter: (req, file, cb) => {
      if (!MIMETYPES.includes(file.mimetype)) cb(new Error(`Only ${MIMETYPES.join(", ")} are allowed`),false);
      else cb(null, true);  
    },
    limits:{
        fieldSize:50000000,
    }
})


imgroute.post('/', multerImages.single("image") ,(req,res)=>{
    res.status(200).json({msg:"image successfully changed", url:`${SV_HOST}/images/${req.file.filename}`})
})
imgroute.use("/",express.static(`${__dirname}/../images`))


module.exports=imgroute;