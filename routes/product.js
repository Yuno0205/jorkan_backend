const Product = require("../models/Product");

const router = require("express").Router();

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  // const qNew = req.query.new;
  // const qCategory = req.query.category;
  // try {
  //   let products;

  //   if (qNew) {
  //     products = await Product.find().sort({ createdAt: -1 }).limit(1);
  //   } else if (qCategory) {
  //     products = await Product.find({
  //       categories: {
  //         $in: [qCategory],
  //       },
  //     });
  //   } else {
  //     products = await Product.find();
  //   }

  //   res.status(200).json(products);
  // } catch (err) {
  //   res.status(500).json(err);
  // }

  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let gender = req.query.gender || "All";

    const genderOptions = ["Male", "Female", "Unisex"];

    gender === "All"
      ? (gender = [...genderOptions])
      : (gender = req.query.gender.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const products = await Product.find({
      title: { $regex: search, $options: "i" },
    })
      .populate("options")
      .where("gender")
      .in([...gender])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Product.countDocuments({
      gender: { $in: [...gender] },
      title: { $regex: search, $options: "" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      gender: genderOptions,
      products,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "otherOptions"
    );

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
