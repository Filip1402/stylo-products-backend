const axios = require("axios");

const URL_GET_ENTRY = `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_API_SPACEID}/entries/`;

const token = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

async function getEntryById(entryId, query = "") {
  try {
    console.log(URL_GET_ENTRY + entryId + query)
    const response = await axios.get(URL_GET_ENTRY + entryId, config);
    return response.data.fields;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getEntryById,
};
