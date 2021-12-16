// npm mudoles
const { v4: uuidv4 } = require("uuid");
const randomNumber = require("number-random");
const fs = require("fs");
const path = require("path");
// models
const Product = require("../../models/index").Product;
const Advertiser = require("../../models/index").AdvertiseOwner;
const Image = require("../../models/index").Image;
class productController {
  async index(req, res) {
    try {
      const allProducts = await Product.findAll({
        where: { advertiseOwnerId: req.user.id },
      });
      return res.json({
        success: true,
        message: "fetch all products",
        data: allProducts,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all product",
      });
    }
  }
  async single(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findOne({
        where: { advertiseOwnerId: req.user.id, id: productId },
      });
      return res.json({
        success: true,
        message: `fetch ${product.title} products`,
        data: product,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "product id is not true",
      });
    }
  }
  async create(req, res) {
    try {
      const advertiser = await Advertiser.findOne({
        where: { id: req.user.id },
      });
      if (!advertiser) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this user",
        });
      }
      const { title, description, price, numbers, attribute } = req.body;
      const productData = {
        title,
        description,
        price,
        numbers,
        attribute,
        image: `${req.file.destination}/${req.file.filename}`,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        productCode: randomNumber(1000, 5000),
      };

      const product = await Product.create(productData);
      // create new image
      const imageData = {
        id: uuidv4(),
        model: "Product",
        modelId: product.id,
        name: product.title,
        originalUrl: product.image,
        thumbnailUrl: `http://${req.hostname}:${
          process.env.PORT || 3000
        }/${product.image.slice(2)}`,
      };
      const newImage = await Image.create(imageData);

      return res.json({
        success: true,
        message: `create product => ${product.title}`,
        data: product,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create product",
      });
    }
  }
  async update(req, res) {
    try {
      const { productId } = req.params;
      const prevProduct = await Product.findOne({
        where: { advertiseOwnerId: req.user.id, id: productId },
      });
      if (!prevProduct) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this product",
        });
      }
      // remove the product image
      const removeImage = await fs.unlinkSync(path.resolve(prevProduct.image));
      //
      const { title, description, price, numbers, attribute } = req.body;
      const productData = {
        title,
        description,
        price,
        numbers,
        attribute,
        image: `${req.file.destination}/${req.file.filename}`,
      };
      const product = await Product.update(productData, {
        where: { id: prevProduct.id },
      });

      // update image
      const imageData = {
        originalUrl: productData.image,
        thumbnailUrl: `http://${req.hostname}:${
          process.env.PORT || 3000
        }/${productData.image.slice(2)}`,
        name: title,
      };
      const updateImage = await Image.update(imageData, {
        where: { model: "Product", modelId: prevProduct.id },
      });

      return res.json({
        success: true,
        message: `update products`,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant update product",
      });
    }
  }
  async delete(req, res) {
    try {
      const { productId } = req.params;
      const prevProduct = await Product.findOne({
        where: { advertiseOwnerId: req.user.id, id: productId },
      });
      if (!prevProduct) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this product",
        });
      }
      // remove the product image
      const removeImage = await fs.unlinkSync(path.resolve(prevProduct.image));
      //

      // remove the image Model
      const removeImageModel = await Image.destroy({
        where: { modelId: prevProduct.id },
      });
      // remove the product
      const removeProduct = await Product.destroy({
        where: { id: prevProduct.id },
      });
      return res.json({
        success: true,
        message: `delete products`,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant update product",
      });
    }
  }
}

module.exports = new productController();
