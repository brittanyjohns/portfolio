const axios = require("axios");
const fs = require("fs");

// const encodedParams = new URLSearchParams();
// encodedParams.append(
//   "apiKey",
//   "5179d8d01cmsh8edff2e22ff9d93p15a8d9jsnb93046b07a9e"
// );

// const options = {
//   method: "POST",
//   url: "https://strainraygorodskijv1.p.rapidapi.com/getAllStrains",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": "5179d8d01cmsh8edff2e22ff9d93p15a8d9jsnb93046b07a9e",
//     "X-RapidAPI-Host": "StrainraygorodskijV1.p.rapidapi.com",
//   },
//   data: encodedParams,
// };
function log(content) {
  console.log(`==> ${content}`);
  fs.writeFile("test.csv", `${content}\n`, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
async function makeRequest(options, resultsPerRequest) {
  axios
    .request(options)
    .then(function (response) {
      console.log(`===>>>> ${response.data.hits.strain.length}`);
      for (const strain in response.data.hits.strain) {
        const index = resultsPerRequest + parseInt(strain);
        const strainName = response.data.hits.strain[strain].name;
        const id = response.data.hits.strain[strain].id;

        log(`${index},${id},${strainName}`);
      }
      //   console.log(
      //     `#1 - ${JSON.stringify(response.data.hits.strain.length, null, " ")}`
      //   );
    })
    .catch(function (error) {
      console.error(error);
    });
}

let requestCount = 0;
let resultsPerRequest = 0;
while (requestCount < 2) {
  console.log(`${requestCount}: resultsPerRequest: ${resultsPerRequest}`);
  const options = {
    method: "GET",
    url: `https://consumer-api.leafly.com/api/strain_playlists/v2?&enableNewFilters=true&skip=${resultsPerRequest}&take=60&lat=41.3722&lon=-82.1087`,
  };
  makeRequest(options, resultsPerRequest);
  resultsPerRequest += 60;

  requestCount++;
}
