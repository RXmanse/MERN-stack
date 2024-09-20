const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const FetchUser = require("../middleware/FetchUser");
const Products = require("../model/Product");
const router = express.Router();
require("dotenv").config({
  path: ".env",
});
const JWT_SECRET = process.env.SECRET;

// creating user using post "api/auth/createuser"

router.get("/", (req, res) => {
  mern = {
    a: "Devdas",
    b: "Sarge",
  };

  res.send(mern);
});

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      res.json({ user, authToken });
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);
// login user using post "api/auth/login"

router.post(
  "/login",
  [body("password").isLength({ min: 5 }), body("email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: "user not found" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      res.json({ user, authToken });
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);

router.get("/getuser", FetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

/* router.post("/createproducts", (req, res) => {
  const user = Products(req.body);
  res.send(req.body);
  user.save();
  console.log(req.body);
}); */

module.exports = router;
