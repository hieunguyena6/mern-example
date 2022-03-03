const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const Schema = mongoose.Schema;

const app = express();
app.use(express.json());
app.use(cors());

const scoresModel = mongoose.model(
  "Scores",
  new Schema({
    value: Number,
  })
);

const connectMongoDb = async () => {
  await mongoose.connect(
    process.env.MONGO_URI ||
      "mongodb+srv://test:test@cluster0.iotdc.mongodb.net/test"
  );
  console.log(mongoose.connection.readyState);
};

app.post("/scores", async (req, res) => {
  const newScore = new scoresModel();
  newScore.value = req.body.value;
  await newScore.save();
  res.send("Sucess !!");
});

app.get("/scores", async (req, res) => {
  res.json(await scoresModel.find({}));
});

app.get("/", (req, res) => {
  res.send("SERVER IS UP AND RUNNING");
});

const port = process.env.PORT || 8090;
app.listen(port, async () => {
  await connectMongoDb();
  console.log("listening on port " + port);
});
