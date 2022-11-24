const express = require("express");
const app = express();
const axios = require("axios");
const parser = require("body-parser");
const https = require("https");

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

app.get("*", async (req, res) => {
  try {
    const { url, token } = req.query;
    const response = await instance.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "bad request",
      errorMessage: error.toString(),
    });
  }
});

app.post("*", async (req, res) => {
  try {
    const {
      body: { url, ...data },
    } = req;

    const response = await instance.post(url, data.data, {
      headers: data.headers,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "bad request",
      errorMessage: error.toString(),
      error: error.response.data,
    });
  }
});

app.put("*", async (req, res) => {
  try {
    const {
      body: { url, ...data },
    } = req;

    const response = await instance.put(url, data.data, {
      headers: data.headers,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "bad request",
      errorMessage: error.toString(),
      error: error.response.data,
    });
  }
});

app.listen(4005, () => {
  console.log("listening on port 4005");
});
