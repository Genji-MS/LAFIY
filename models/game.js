const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/populate");
const Challenge = require('../models/challenge');

const GameSchema = new Schema({
  topic: { type: String, required: true },
  title: { type: String, required: true },
//  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  challenges: [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
});
// Always populate the author field
GameSchema
    .pre('findOne', Populate('challenges'))
    .pre('find', Populate('challenges'))
    .pre('findById', Populate('challenges'))

module.exports = mongoose.model("Game", GameSchema);