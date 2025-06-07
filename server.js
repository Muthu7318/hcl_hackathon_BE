const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 8000;

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Db connection successful");
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
