const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Populate = require("../util/autopopulate");

const PostSchema = new Schema({
  topic: { type: String, required: true },
  title: { type: String, required: true },
//  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
//  pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
});
// Always populate the author field
/*PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))*/

module.exports = mongoose.model("Game", PostSchema);