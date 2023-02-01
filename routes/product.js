const Product = require("../models/Product");
const Option = require("../models/Option");

const router = require("express").Router();

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let gender = req.query.gender || "All";
    let color = req.query.color || "All";
    let size = req.query.size || "All";

    const genderOptions = ["Male", "Female", "Unisex"];
    const colorOptions = [
      "White",
      "Black",
      "Red",
      "Blue",
      "Purple",
      "Yellow",
      "Green",
      "Brown",
      "Pink",
    ];

    const sizeOptions = [
      "35",
      "35",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
    ];

    gender === "All"
      ? (gender = [...genderOptions])
      : (gender = req.query.gender.split(","));

    color === "All"
      ? (color = [...colorOptions])
      : (color = req.query.color.split(","));

    size === "All"
      ? (size = [...sizeOptions])
      : (size = req.query.size.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const products = Option.find({ color: { $in: [...color] } }).then(
      async (option) => {
        const optionIds = option.map((item) => item._id);
        const result = await Product.find({
          title: { $regex: search, $options: "i" },
          // gender: { $in: [...gender] },
          options: { $in: optionIds },
        })
          .populate("options")
          .where("gender")
          .in([...gender])
          .sort(sortBy)
          .skip(page * limit)
          .limit(limit);

        const total = await Product.countDocuments({
          gender: { $in: [...gender] },
          title: { $regex: search, $options: "i" },
        });

        const response = {
          error: false,
          total,
          page: page + 1,
          limit,
          gender: genderOptions,
          color: colorOptions,
          products: result,
        };

        res.status(200).json(response);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Test
router.get("/test", async (req, res) => {
  let color = req.query.color || "All";
  const colorOptions = [
    "White",
    "Black",
    "Red",
    "Blue",
    "Purple",
    "Yellow",
    "Green",
    "Brown",
    "Pink",
  ];

  color === "All"
    ? (color = [...colorOptions])
    : (color = req.query.color.split(","));
  try {
    Option.find({ color: { $in: [...color] } }).then(async (option) => {
      const optionIds = option.map((item) => item._id);
      const data = await Product.find({ options: { $in: optionIds } });
      res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

//
router.get("/related/:id", async (req, res) => {
  try {
    const response = await Product.find({
      options: { _id: req.params.id },
    }).populate("options");

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Error" });
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("options");

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

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
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
