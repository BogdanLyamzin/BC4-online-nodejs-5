const express = require("express");
const cors = require("cors");

const {postsApi} = require("./api");

const app = express();

app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/posts", postsApi);

const port = process.env.PORT || 3000;

app.listen(port);