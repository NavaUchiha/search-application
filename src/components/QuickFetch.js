import { v4 as uuidv4 } from "uuid";
import advancedFilterGlobalObject from "../data/AdvancedFilterGlobalObject";
const Constants = require("./../data/Constants");

const fetchDiscourseWithSynonyms = (searchValue) => {
  const parameters = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      searchQuery: searchValue,
      advancedSettings: advancedFilterGlobalObject.filter,
    }),
  };

  return searchWithSynonyms(parameters, "");
};

const fetchDiscourse = (searchValue) => {
  const parameters = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      searchQuery: searchValue,
    }),
  };

  return searchExactAndShingles(parameters, "");
};

function searchExactAndShingles(parameters, setDiscourseArray) {
  return fetch("http://localhost:8080/searchExactAndShingles", parameters)
    .then((response) => response.json())
    .then((json) => {
      console.log("value received on return" + json);
      const discourseArrayWithUUIDs = json.discourseList.map((element) => {
        element["uuid"] = uuidv4();
        element.highlights = removingDuplicateHighlights(element.highlights);
        return element;
      });
      console.log(discourseArrayWithUUIDs[0].highlights);

      localStorage.removeItem("discourseArrayWithUUIDs");
      var discourseArrayWithUUIDsJSON = JSON.stringify(discourseArrayWithUUIDs);
      localStorage.setItem(
        "discourseArrayWithUUIDs",
        discourseArrayWithUUIDsJSON
      );
      return discourseArrayWithUUIDs;
    })
    .catch((error) =>
      console.log("Error occurred while fetching from ES!!! " + error)
    );
}

function searchWithSynonyms(parameters, setDiscourseArray) {
  return fetch("http://localhost:8080/searchWithSynonym", parameters)
    .then((response) => response.json())
    .then((json) => {
      return formattingSearchResponse(json);
    })
    .catch((error) => {
      console.log(
        "Error occurred   .. while fetching from ES!!! " + error.message
      );
      throw Error(error.message);
    });
}

function formattingSearchResponse(json) {
  console.log("json : ", json);
  if (json.total === 0) throw Error(Constants.ERROR_NO_RESULTS);
  const discourseArrayWithUUIDs = json.discourseList.map((element) => {
    element["uuid"] = uuidv4();
    element.highlights = removingDuplicateHighlights(element.highlights);
    return element;
  });
  console.log(discourseArrayWithUUIDs[0].highlights);

  localStorage.removeItem("discourseArrayWithUUIDs");
  var discourseArrayWithUUIDsJSON = JSON.stringify(discourseArrayWithUUIDs);
  localStorage.setItem("discourseArrayWithUUIDs", discourseArrayWithUUIDsJSON);
  return discourseArrayWithUUIDs;
}

function removingDuplicateHighlights(duplicateInclusiveHLArrays) {
  return Array.from(new Set(duplicateInclusiveHLArrays));
}

export { fetchDiscourseWithSynonyms, fetchDiscourse };
