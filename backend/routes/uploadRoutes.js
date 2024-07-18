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

// const upload = multer({ storage, fileFilter });
const upload = multer({ storage });
const uploadSingle = upload.single("file");

router.post("/single", (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    } else {
      console.log(req.file);
      console.log({ file: `files/${req.file.filename}` });
      res.json({ file: `files/${req.file.filename}` });
    }
  });
});

router.post(
  "/",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "optReceipt", maxCount: 1 },
    { name: "driverLicense", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("start uploading");
    const files = req.files;
    console.log(files);
    res.json({
      profilePicture: files.profilePicture
        ? `files/${files.profilePicture[0].filename}`
        : null,
      optReceipt: files.optReceipt
        ? `files/${files.optReceipt[0].filename}`
        : null,
      driverLicense: files.driverLicense
        ? `files/${files.driverLicense[0].filename}`
        : null,
    });
  }
);

export default router;