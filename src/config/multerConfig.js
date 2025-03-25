import multer from "multer";
import path from "path";

// Setting up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Upload folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`
    ); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
}).single("profilePic");

export default upload;
