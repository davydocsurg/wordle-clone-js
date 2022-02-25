const PORT = 8000;
const express = require("express");
const axios = require("axios").default;
require("dotenv").config();
const cors = require("cors");
const server = express();

server.use(cors());

server.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

server.get("/check", (req, res) => {
  console.log(req);

  const options = {
    method: "GET",
    url: "https://twinword-word-graph-dictionary.p.rapidapi.com/theme/",
    params: { entry: "mask" },
    headers: {
      "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

server.listen(PORT, () => console.log("server..." + PORT));
