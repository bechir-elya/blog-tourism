import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: String,
    content: String
})

const Category = mongoose.model('Category', categorySchema);

export default Category;