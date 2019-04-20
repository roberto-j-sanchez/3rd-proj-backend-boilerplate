const express = require('express');
const router = express.Router();

const fileUploader = require('../config/upload-setup/cloudinary');

router.post('/upload-file', fileUploader.single('submittedFile'), (req, res, next) => {
  if(!req.file){
    next(new Error('No File Uploaded!'));
    return;
  }
  const { originalName, secure_url, format, width, height } = req.file;

  res.json({
    fileName: originalName,
    fileUrl: secure_url,
    format,
    width,
    height
  });
});

module.exports = router;