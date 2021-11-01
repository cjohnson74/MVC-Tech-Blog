const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all blog posts and JOIN with user data
        const blogpostData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so that template can read it.
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            projects,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                model: User,
                attributes: ['name'],
                },
            ],
        });

        const blogpost = blogpostData.get({ plain: true });

        res.render('project', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/blogpost', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const blogpostData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        const user = userData.get({ plain: true });

        res.render('blogpost', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/blogpost');
        return;
    }

    res.render('login');
});

module.exports = router;