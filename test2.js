const axios = require("axios");
const fs = require("fs");

function log(content) {
  console.log(`==> ${content}`);
  fs.writeFile("test2.csv", `${content}\n`, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

async function makeRequest(url, resultsPerRequest) {
  const response = await axios.get(
    "https://consumer-api.leafly.com/api/strain_playlists/v2?&enableNewFilters=true&skip=0&take=18&lat=41.3722&lon=-82.1087"
  );

  const totalStrains = response.data.hits.strain.length;
  console.log(`${resultsPerRequest}: ${totalStrains}`);

  for (const strain in totalStrains) {
    const index = resultsPerRequest + parseInt(strain);
    const strainName = response.data.hits.strain[strain].name;
    const id = response.data.hits.strain[strain].id;

    log(`${index},${id},${strainName}`);
  }
  //   console.log(
  //     `#1 - ${JSON.stringify(response.data.hits.strain.length, null, " ")}`
  //   );
}

async function run() {
  let requestCount = 0;
  let resultsPerRequest = 0;
  while (requestCount < 2) {
    // console.log(`${requestCount}: resultsPerRequest: ${resultsPerRequest}`);
    const url = `https://consumer-api.leafly.com/api/strain_playlists/v2?&enableNewFilters=true&skip=${resultsPerRequest}&take=60&lat=41.3722&lon=-82.1087`;
    await makeRequest(url, resultsPerRequest);
    resultsPerRequest += 10;

    requestCount++;
  }
}

run();
