const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'djptnmqtl',
  api_key: '163441213535695',
  api_secret: '7xqLrsV-gAJO1o3_je2kMvtq3iM',
  secure: true,
});

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'mysiibit',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const parser = multer({ storage: storage });

const cloudinaryUpload = (req, res) => {
  try {
    // Use parser.array() to handle multiple file uploads
    parser.array('img', 1)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Check if there are files to upload
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files provided' });
      }

      // Cloudinary upload for each file
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, { public_id: req.body.id }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      });

      // Wait for all uploads to complete
      Promise.all(uploadPromises)
        .then((results) => {
          // Send the Cloudinary response for each file
          return res.status(200).json(results);
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    });
  } catch (err) {
    res.status(500).json('serv err');
  }
};

module.exports = cloudinaryUpload;
