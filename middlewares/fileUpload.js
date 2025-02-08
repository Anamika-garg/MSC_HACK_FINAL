const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Multer Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "your-folder", // specify a folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // restrict file formats if needed
  },
});

// Create Multer upload middleware
const upload = multer({ storage: storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


// Middleware to Handle File Upload and Cloudinary Upload
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  // Log the Cloudinary URL (it could be in secure_url or path)
  console.log("File uploaded to Cloudinary:", req.file.secure_url || req.file.path);

  req.cloudinaryUrl = req.file.secure_url || req.file.path;
  // Proceed to the next middleware or route handler
  next();
};

module.exports = { upload, uploadToCloudinary };
