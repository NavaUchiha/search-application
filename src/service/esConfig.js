import { v4 as uuidv4 } from "uuid";
const { Client } = require("@elastic/elasticsearch");
const {
  extractSearchResponse,
  extractSearchResponseExactAndShingles,
  extractSearchResponseSynonym,
} = require("./Utils");
const {
  populateESBody,
  populateESBodyForDiscourseIndexStandardExactShingle,
} = require("./ESBody");
const {
  populateESBodyForDiscourseIndexSynonym,
} = require("./GeneralAndSpecificSynonymsBody");

const client = new Client({
  node: "http://localhost:9200",
});

const index = "discourse_analyser_index";
const discourseIndex = "discourse_index";
const bookmarkIndex = "bookmark_index";
const discourse_search_index = "discourse_search_index";
const discourse_index_exact_shingle = "discourse_index_exact_shingle";

const searchAdvanced = async function (data) {
  console.log(" inside searchAdvanced received data " + data);

  const requestBody = populateESBody(data);

  const response = await client.search({
    index: index,
    body: requestBody.toJSON(),
  });
  return extractSearchResponse(response);
};
const searchShinglesAndExact = async function (data) {
  console.log("inside searchShinglesAndExact received data " + data);

  const requestBody = populateESBodyForDiscourseIndexStandardExactShingle(data);

  const response = await client.search({
    index: discourse_index_exact_shingle,
    body: requestBody.toJSON(),
  });
  return extractSearchResponseExactAndShingles(response);
};

const searchWithSynonyms = async function (data, advancedSettings) {
  console.log("inside searchWithSynonyms received data " + data);

  const requestBody = populateESBodyForDiscourseIndexSynonym(
    data,
    advancedSettings
  );

  const response = await client.search({
    index: discourse_search_index,
    body: requestBody.toJSON(),
  });
  return extractSearchResponseSynonym(response);
};

const registerUserId = async (userName) => {
  const response = await client.index({
    index: bookmarkIndex,
    body: {
      userName: "Chaitanya",
      userId: uuidv4(),
      bookmarkArray: [],
    },
  });
  return response;
};

// export default {
//   searchAdvanced,
//   searchShinglesAndExact,
//   searchWithSynonyms,
//   registerUserId,
// };

module.exports = registerUserId;
