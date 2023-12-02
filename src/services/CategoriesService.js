const categoriesAPI = require("../utils/CommerceToolsApiClient");
const axios = require("axios");

const URL_GET_CATEGORIES = `${categoriesAPI.apiURLBase}/${categoriesAPI.projectKey}/categories`;

async function getCategoryById(id) {
  try {
    const bearerToken = await categoriesAPI.getAccessToken();
    console.log(URL_GET_CATEGORIES + "/" + id)
    const response = await axios.get(URL_GET_CATEGORIES + "/" + id, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCategoryById
};
