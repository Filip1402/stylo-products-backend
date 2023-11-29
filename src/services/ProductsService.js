const axios = require("axios");
const commerceToolsApi = require("../utils/CommerceToolsApiClient");

const URL_GET_PRODUCTS = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/products`;

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

module.exports = {
  getAllProducts,
};
