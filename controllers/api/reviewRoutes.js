const router = require('express').Router();
const { Blogs } = require('../../models');


// Post new blog post
router.post('/', async(req, res) => {
    try {
        const newBlog = await Blogs.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});