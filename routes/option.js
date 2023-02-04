const Option = require("../models/Option");

const router = require("express").Router();

//GET ALL OPTION
router.get("/", async (req, res) => {
  try {
    let options = await Option.find({});
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", async (req, res) => {
  try {
    let options = await Option.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Arrivals
router.get("/arrival", async (req, res) => {
  try {
    let options = await Option.find().sort({ createdAt: -1 }).limit(7);
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sale", async (req, res) => {
  try {
    let options = await Option.find({
      discount: { $gt: 0 },
    }).sort({ discount: -1 });
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  const search = req.query.search || "";
  try {
    let options = await Option.find({
      title: { $regex: search, $options: "i" },
    }).limit(5);
    res.status(200).json(options);
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
    const updatedOption = await Option.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOption);
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
