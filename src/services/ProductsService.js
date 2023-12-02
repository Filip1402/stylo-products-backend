const axios = require("axios");
const commerceToolsApi = require("../utils/CommerceToolsApiClient");
const URL_GET_PRODUCTS = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/products`;
const URL_GET_PRODUCT_TYPE = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/product-types`;
const URL_GET_CATEGORY = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/categories`;
const URL_GET_PRODUCT = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/product-projections/search`;

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

async function getProductForHomepage(id) {
  try {
    const bearerToken = await commerceToolsApi.getAccessToken();
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
  getProductById,
  getProductType,
  getCategoryById,
  getProductForHomepage
};
