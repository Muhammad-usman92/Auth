const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();
const ProductService = require("../service/productService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// validation
const { registerValidation, loginValidation } = require("../validation");
router.post("/register", jsonParser, async (req, res) => {
  const { error } = registerValidation(req.body);

  // validate:
  if (error) return res.status(400).send(error.details[0].message);

  // check the user if the email is already exist:
  const emailExist = await ProductService.getById(req.body.email);
  if (emailExist) return res.status(400).send("Email already exist");

  // hashing the password:
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  console.log(req.body.name, " ", req.body.email, " ", req.body.password);
  const product = ProductService.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Login page
router.post("/login", jsonParser, async (req, res) => {
  const { error } = loginValidation(req.body);

  // validate:
  if (error) return res.status(400).send(error.details[0].message);

  // check the email
  const emailExist = await ProductService.getById(req.body.email);

  if (!emailExist)
    return res.status(400).send("Email Not found or password is incorect");
  // Password checeking:
  const validPass = await bcrypt.compare(
    req.body.password,
    emailExist.password
  );
  if (!validPass) return res.status(400).send("Invalid Password");

  const token = jwt.sign(
    { id: emailExist.id, name: emailExist.name, email: emailExist.email },
    "JSON_WEB_TOKEN"
  );
  res.header("Auth-token", token).send(token);
});

module.exports = router;
