var express = require("express");
var router = express.Router();
const controller = require("../controllers/ProductsController");

router.get("/", function (req, res, next) {
  controller.getAllProducts(req, res);
});

module.exports = router;
