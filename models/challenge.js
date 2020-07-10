const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/populate");

const ChalSchema = new Schema({
  challenge: { type: String, required: true }
//  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
});
// Always populate the author field
/*PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))*/

module.exports = mongoose.model("Challenge", ChalSchema);