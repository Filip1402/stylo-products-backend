const service = require("../services/ProductsService");

async function getAllProducts(req, res) {
  const products = await service.getAllProducts();
  res.json(products);
}

async function getProductById(req, res) {
  const product = await service.getProductById(req.params.id);
  if (product != undefined) {
    if (product.length > 0) {
      return res.status(200).json(product[0]);
    } else {
      return res.status(404).json({ error: "Product doesn't exist" });
    }
  } else {
    return res.status(404).json({ error: "Invalid ID format" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
};
