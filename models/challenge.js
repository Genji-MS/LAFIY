const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/populate");

const ChalSchema = new Schema({
  challenge: { type: String, required: true }
});

module.exports = mongoose.model("Challenge", ChalSchema);