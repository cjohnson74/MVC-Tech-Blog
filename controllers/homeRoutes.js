const router = require("express").Router();
const { Blogpost, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/homepage", async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: User,
    });

    // Serialize data so that template can read it.
    const blogposts = blogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );
    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
