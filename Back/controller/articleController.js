import Article from "../model/articleModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { unlink } from 'node:fs';

export const getArticle = async (req, res) => {
    const data = await Article.find().populate('category');
    const dataCategories = await Category.find();
    res.json({ articles: data, categories: dataCategories });
};

export const getNewArticle = async (req, res) => {
    const dataCategories = await Category.find();
    res.json({ categories: dataCategories });
}

export const addNewArticle = async (req, res) => {
    console.log(req.body);
    await Article.create({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        image: req.file.filename
    })
    res.json('added successfully');
}


export const addNewCategory = async (req, res) => {
    await Category.create({
        title: req.body.title,
        content: req.body.content
    })
    res.json('added succesfully');
}


export const getDetails = async (req, res) => {
    const id = req.params['id'];
    const data = await Article.findById(id).populate('category').populate('comments.user');
    res.json({ article: data });
}


export const deleteArticle = async (req, res) => {
    const id = req.params['id'];

    const data = await Article.findById(id);
    const image = data.image;
    
    const article = await Article.findByIdAndDelete(id);
    unlink(`public/uploads/${image}`, (err) => {
        if (err) throw err;
        console.log('Image deleted successfully');
    });

    return res.status(200).json({ success: true, msg: 'Article Deleted' });
}


export const getUpdateArticle = async (req, res) => {
    const id = req.params['id'];
    const data = await Article.findById(id);
    const dataCategories = await Category.find();
    res.json({ article: data, categories: dataCategories });
}


export const updateArticle = async (req, res) => {
    const id = req.params['id'];
    console.log(req.body);
    if (!req.file) {
        await Article.findByIdAndUpdate(id, {

            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
        })
    } else {
        await Article.findByIdAndUpdate(id, {

            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.file.filename
        })
    }
    return res.status(200).json({ success: true, msg: 'Article updated' });
}


export const createAccount = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    const password = req.body.password;

    if (userExists) {
        return res.status(400).json( 'User already exists' );
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        res.json('account created');
    }
}



export const connect = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const doesExist = await User.findOne({ email:email});

    if (!doesExist) {
        res.status(400).json( 'Invalid user or password' );
    } else {
        const passwordMatch = await bcrypt.compare(password, doesExist.password);
        if (!passwordMatch) {
            res.status(400).json('Invalid user or password' );
        } else {
            const token = jwt.sign({ userId: doesExist._id, username: doesExist.username, role:doesExist.role }, 'mefkkzerjrjvnzerkjekgelhgk', { expiresIn: '1h' });
           
            res.json(token)
        }
    } 
}


export const addComment = async (req, res) => {
    const id = req.params['id'];
    const item = await Article.findById(id)

    item.comments.push({
        title: req.body.title,
        content: req.body.content,
        user: req.body.user
    })

    await item.save();
    res.json('Comment added');
}