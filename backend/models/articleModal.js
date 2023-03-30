const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    userName: {
        type:String
    },
    profile: {
        type: String
    },
    coverImg: {
        type: String
    },
    coverImg: {
        type: String,
      },
      createdDate: {
        type: String,
        default: () => new Date().toISOString().substr(0, 10)
      }
},
{
    timestamps: true
}
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;


