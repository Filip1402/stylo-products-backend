const axios = require("axios");

const URL_GET_PRODUCTS = `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_API_SPACEID}/entries`;
const product_content_type = "commercetoolsProduct";

async function getAllProducts() {
  try {
    const token = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;
    const response = await axios.get(URL_GET_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        content_type: product_content_type,
      },
    });

    return response.data.items;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllProducts,
};
