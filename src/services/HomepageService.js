const axios = require("axios");

const HOMEPAGE_ID = "31LZZc1fP6kzclDO40Udfz";
const URL_GET_ENTRY = `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_API_SPACEID}/entries/`;
const GET_HOMEPAGE_PARAMS = `?content_type=homepage&sys.id=${HOMEPAGE_ID}&select=fields`;

const token = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

function getImagesJson(response) {
  return response.data.includes.Asset.map((image) => {
    return {
      [image.fields.title]: {
        url: image.fields.file.url.replace("//", "")
      }
    };
  });
}

function getProductIds(response) {
  return response.data.includes.Entry.map((product) => {
    return {
      id: product.fields.id
    }
  });
}

async function getContentfulHomepageData() {
  try {
    const response = await axios.get(URL_GET_ENTRY + GET_HOMEPAGE_PARAMS, config);
    const imageUrls = getImagesJson(response);
    const productIds = getProductIds(response);
    return productIds;
  } catch (err) {
    console.error(err);
  }
}

async function getHomepage() {
  return getContentfulHomepageData();
}

module.exports = {
  getHomepage,
};
