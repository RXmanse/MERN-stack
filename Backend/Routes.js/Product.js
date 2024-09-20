const express = require("express");
const Product = require("../model/Product");
const FetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.get("/getallproduct", FetchUser, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

router.post(
  "/addproduct",
  FetchUser,
  body("title").isLength({ min: 3 }),
  body("description").isLength({ min: 5 }),
  async (req, res) => {
    console.log("req.files", req.files);
    console.log("req.body", req.body);
    try {
      const { title, description, price, instock } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let images = req.files.map((el) => {
        return el.filename;
      });
      const product = new Product({
        title,
        description,
        price,
        instock,
        images,
        user: req.user.id,
      });

      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);

router.put("/updateproduct/:id", FetchUser, async (req, res) => {
  const { title, description, price, instock } = req.body;
  try {
    const newProduct = {};
    if (title) {
      newProduct.title = title;
    }
    if (description) {
      newProduct.description = description;
    }
    if (price) {
      newProduct.price = price;
    }
    if (instock) {
      newProduct.instock = instock;
    }

    let product = await Product.findById(req.params.id);

    if (!product) res.status(404).send("not found");

    if (!product.user || product.user.toString() !== req.user.id)
      res.status(401).send("not allowed");

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

router.delete("/deleteproduct/:id", FetchUser, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) res.status(404).send("not found");
    if (product.user.toString() !== req.user.id)
      res.status(401).send("not allowed");

    product = await Product.findByIdAndDelete(req.params.id);
    res.json({ success: "The product has been deleted", product: product });
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

module.exports = router;
