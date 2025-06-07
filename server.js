const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/UserRoutes");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://user:75a20d4f71_2@cluster0.gdwygek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
}

connectToMongoDB();

const app = express();

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use("/api/v1/users", userRouter);

const port = 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
