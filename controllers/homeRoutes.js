const router = require('express').Router();
const { User, Blogs } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', withAuth, async(req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [
                ['username', 'ASC']
            ],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('home', {
            users,
            // TODO: Add a comment describing the functionality of this property
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', async(req, res) => {
    try {
        const blogData = await Blogs.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username'],
            }, ],
        });

        const singleBlog = blogData.get({ plain: true });

        res.render('blog', {
            ...singleBlog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// render read-review handlebar
router.get('/readreview', async(req, res) => {
    try {
        // Get all projects and JOIN with user data
        const blogsData = await Blogs.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }, ],
        });

        // Serialize data so the template can read it
        const blogs = blogsData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('read-review', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// render write-review handlebar
router.get('/writereview', async(req, res) => {
    try {
        res.render('new-review', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/profile', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // TODO: Add a comment describing the functionality of this if statement
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;