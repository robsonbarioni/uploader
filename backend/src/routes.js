const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multerconfig");
const Post = require('./models/Post');

routes.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
});

routes.delete("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.remove();
    res.send(`Removed: ${req.params.id}`);
});

routes.post("/", multer(multerConfig).single("file"), async (req, res) => {
    const { originalname: name, size, key, url } = req.file;
    const post = await Post.create({ name, size, key, url });
    res.json(post);
});

module.exports = routes;
