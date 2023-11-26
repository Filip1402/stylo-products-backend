const service = require("../services/ProductsService");

async function getAllProducts(req, res) {
  const products = await service.getAllProducts();
  res.json(products);
}

module.exports = {
  getAllProducts,
};
