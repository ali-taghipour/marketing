/* eslint-disable node/callback-return */
const multer = require("multer");
const mkdirp = require("mkdirp");
const fs = require("fs");

const getDirDocument = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDay();
  return `./public/uploads/documents/${year}/${month}/${day}`;
};
const FileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = getDirDocument();

    mkdirp(dir).then(() => callback(null, dir));
  },

  filename: (req, file, callback) => {
    const filePath = `${getDirDocument()}/${file.originalname}`;

    if (!fs.existsSync(filePath)) callback(null, file.originalname);
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadFile = multer({
  storage: FileStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});
module.exports = uploadFile;
