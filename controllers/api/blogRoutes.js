const router = require('express').Router();
const { Blogs } = require('../../models');

// GET route for all blog posts
router.get('/', async(req, res) => {
    try{
        const blogs = await Blogs.findAll()

        res.status(200).json(blogs)
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET route for single blog post
router.get('/:id', async(req, res) =>{

    try{
        const blog = await Blogs.findByPk(req.params.id)

        res.status(200).json(blog)

    } catch(err){
        res.status(400).json(err)
    }
})


// GET route for single country search
router.get('/country/:country_name', async(req, res) =>{

    try{
        const blogByCountry = await Blogs.findAll(
            {
              where: { 
                country_name: req.params.country_name
              },
            })

        if(!blogByCountry){res.status(404).json({message: 'No blogs for this country!'})
        return
        }
        
        res.status(200).json(blogByCountry)

    } catch(err){
        res.status(400).json(err)
    }
})

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


// Delete blogpost with specific post id
router.delete('/:id', async(req, res) => {
    try {
        const newBlogData = await Blogs.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!newBlogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }
        res.status(200).json(newBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;