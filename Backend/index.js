const express = require("express");
const dbConnect = require("./db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const app = express();
dbConnect();

const port = 5000;
app.use(cors());
app.use(express.json());

// Ensure the uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Call this to create the directory if it doesn't exist
ensureUploadsDirectoryExists();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists(); // Ensure the directory exists before saving the file
    cb(null, path.join(__dirname, "uploads")); // Use absolute path
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

app.get("/", (req, res) => {
  res.send("Hello Nepal");
});

app.use("/api/auth", require("./Routes.js/Auth"));
app.use("/api/product", upload.array("myfile"), require("./Routes.js/Product"));

app.listen(port, () => {
  console.log(`api is listening on port: ${port}`);
});
