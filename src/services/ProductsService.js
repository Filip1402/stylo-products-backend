const axios = require("axios");
const commerceToolsApi = require("../utils/CommerceToolsApiClient");

const URL_GET_PRODUCTS = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/products`;
const URL_GET_PRODUCT_TYPE = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/product-types`;
const URL_GET_CATEGORY = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/categories`;

async function getAllProducts() {
  try {
    const bearerToken = await commerceToolsApi.getAccessToken();
    const response = await axios.get(URL_GET_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response.data.results || [];
  } catch (err) {
    console.error(err);
  }
}

async function getProductById(id) {
  const bearerToken = await commerceToolsApi.getAccessToken();
  try {
    const response = await axios.get(URL_GET_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        where: `id="${id}"`,
      },
    });
    return response.data.results || [];
  } catch (err) {
    console.error(err);
  }
}

async function getProductType(id) {
  const bearerToken = await commerceToolsApi.getAccessToken();
  try {
    const response = await axios.get(URL_GET_PRODUCT_TYPE, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        where: `id="${id}"`,
      },
    });
    return response.data.results[0].name;
  } catch (err) {
    console.error(err);
    return "Couldn't retrieve type";
  }
}

async function getCategoryById(id) {
  const bearerToken = await commerceToolsApi.getAccessToken();
  try {
    const response = await axios.get(URL_GET_CATEGORY, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        where: `id="${id}"`,
      },
    });
    return response.data.results[0].name["en-US"];
  } catch (err) {
    console.error(err);
    return "Couldn't retrieve category";
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductType,
  getCategoryById,
};
