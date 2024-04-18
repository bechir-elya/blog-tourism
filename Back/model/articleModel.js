import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: { type: Date, default: Date.now },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const articleSchema = mongoose.Schema({
    title: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    comments: [commentSchema],
    image: String
});

const Article = mongoose.model('Article', articleSchema);

export default Article;