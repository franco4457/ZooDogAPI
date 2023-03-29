const multer = require("multer");
const { extname } = require("path");




const MIMETYPES = ["image/jpg", "image/jpeg", "image/png"];

const multerImages = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/../images`,
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const filename = file.originalname.split(ext)[0] + `-${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!MIMETYPES.includes(file.mimetype))
      cb(new Error(`Only ${MIMETYPES.join(", ")} are allowed`), false);
    else cb(null, true);
  },
  limits: {
    fieldSize: 50000000,
  },
});

module.exports = multerImages;