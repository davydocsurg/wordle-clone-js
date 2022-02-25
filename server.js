const PORT = 8000;
const express = require("express");
const axios = require("axios").default;

const server = express();
server.listen(PORT, () => console.log("server..." + PORT));

server.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": "f15efe3bb7msh1d8714d6b1fb975p197df0jsne661aa10aa2d",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
