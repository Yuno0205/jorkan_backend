const Option = require("../models/Option");

const router = require("express").Router();

//GET ALL OPTION
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Option.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Option.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Option.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ONLY OPTION
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Option.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE
router.post("/", async (req, res) => {
  const newProduct = new Option(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Option has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
