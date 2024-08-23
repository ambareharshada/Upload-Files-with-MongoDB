const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5003;
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
const imageSchema = new mongoose.Schema({
  image: String,
});
const imageModel = mongoose.model("image", imageSchema);

app.get("/", async (req, res) => {

    const data = await (await imageModel.find({})).reverse()
  res.json({ message: "All Image" , data:data});
});
app.post("/upload", async (req, res) => {
  const image = new imageModel({
    image: req.body.image,
  });
  await image.save();
  res.send({ message: "Uploaded Successfully",success:true });
});

mongoose
  .connect("mongodb://localhost:27017/imagebase64")
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server started at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error =>", err);
  });
