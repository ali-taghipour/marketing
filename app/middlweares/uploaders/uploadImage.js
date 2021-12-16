/* eslint-disable node/callback-return */
const multer = require("multer");
const mkdirp = require("mkdirp");
const fs = require("fs");

const getDirImage = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  return `./public/uploads/images/${year}/${month}/${day}`;
};
const ImageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = getDirImage();

    mkdirp(dir).then(() => callback(null, dir));
  },

  filename: (req, file, callback) => {
    const filePath = `${getDirImage()}/${file.originalname}`;

    if (!fs.existsSync(filePath)) callback(null, file.originalname);
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadImage = multer({
  storage: ImageStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

module.exports = uploadImage;
