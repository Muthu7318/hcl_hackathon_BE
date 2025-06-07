const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/UserRoutes");
const shiftRouter = require("./Routes/ShiftRouter");
const staffRouter = require("./Routes/StaffRoutes");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authmiddleware");

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

app.use(authMiddleware);

app.use("/api/v1/shifts", shiftRouter); // Assuming you want to use the same router for shifts
app.use("/api/v1/staff", staffRouter);

const port = 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
