class ConvertFileToField {
  handle = (req, res, next) => {
    if (!req.file) req.body.images = undefined;
    else req.body.file = req.file.filename;
    next();
  };
}

module.exports = new ConvertFileToField();
