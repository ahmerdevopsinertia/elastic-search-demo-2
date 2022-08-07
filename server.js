// Woring project

const express = require("express");
const app = express();
const fs = require("fs");
// const routes = require("./routes");

const { Client } = require("@elastic/elasticsearch");
const es = new Client({
  node: "https://127.0.0.1:9200",
  // maxRetries: 50,
  // requestTimeout: 1000 * 60 * 120,
  auth: {
    username: "elastic",
    passowrd: "756+5gJ*GN0Vaw2B6u5O",
    apiKey: "YndWejRJQUItemdYbjA2VjhBR2o6Q2hSQUtJLTRSdUtKVG5jUzYwLW54Zw==",
  },
  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
});

let port = process.env.port || 3000;

// app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`The elasticsearch server 2 is running on port ${port}`);
});

app.get("/demo", (req, res) => {
  return res.send("Great");
});

app.get("/check", async (req, res) => {
  try {
    const result = await es.search({
      index: "customer",
      query: {
        match: { name: "John" },
      },
    });
    console.log(result);
    return res.send(result);
  } catch (err) {
    return res.send(err.message.toString());
  }
});

app.post()