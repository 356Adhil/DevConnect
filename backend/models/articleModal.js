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
},
{
    timestamps: true
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;


