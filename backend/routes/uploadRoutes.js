import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "files"); 
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  console.log("File received:", file.originalname);
  // Allow pdf, jpg, jpeg, png files
  const filetypes = /pdf|jpe?g|png/;
  const mimetypes = /application\/pdf|image\/jpe?g|image\/png/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPEG, JPG, and PNG files are allowed!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadVisaDocument = upload.single("file"); // Change to "file" to match frontend

router.post("/", (req, res) => {
  console.log("Start uploading visa document");
  uploadVisaDocument(req, res, function (err) {
    if (err) {
      console.error("Upload error:", err.message);
      return res.status(400).send({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    console.log("File uploaded:", req.file.path);
    res.status(200).send({
      message: "Visa document uploaded successfully",
      filePath: `/${req.file.path.replace(/\\/g, '/')}`, // Ensure correct path format
    });
  });
});

export default router;