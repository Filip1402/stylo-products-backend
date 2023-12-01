const axios = require("axios");
const productsAPI = require("../utils/CommerceToolsApiClient");
const categoriesAPI = require("../utils/CommerceToolsApiClient");

const URL_GET_PRODUCTS = `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_API_SPACEID}/entries`;
const URL_GET_PRODUCT = `${productsAPI.apiURLBase}/${productsAPI.projectKey}/product-projections/search`;
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

async function getProductForHomepage(id) {
  try {
    const bearerToken = await productsAPI.getAccessToken();
    const response = await axios.get(URL_GET_PRODUCT + `?filter=variants.sku:"${id}"`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    let shoe = response.data.results[0];
    return {
      name: shoe.name["en-US"],
      available: shoe.masterVariant.availability.isOnStock,
      price: shoe.masterVariant.prices[0].value.centAmount / 100,
      image: shoe.masterVariant.images[0].url
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllProducts,
  getProductForHomepage
};
