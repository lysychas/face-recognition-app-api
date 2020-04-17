const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "ca92671a4f47465384b0f97a006fe8ab",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch(() => res.status(400).json("Unable to update entries"));
};

module.exports = {
  handleImage, // ES6 does not need value
  handleApiCall,
};
