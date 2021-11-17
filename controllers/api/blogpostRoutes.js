const router = require("express").Router();
const { Blogpost, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  Blogpost.findAll({
    include: User, Comment
  })
    // Serialize data so that template can read it.
    .then((blogpostData) =>
      blogpostData.map((blogpost) => blogpost.get({ plain: true }))
    )

    // Pass serialized data and session flag into template
    .then((blogposts) =>
      res.render("homepage", {
        blogposts,
        logged_in: req.session.logged_in,
      })
    )
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get one blogpost
router.get("/:id", (req, res) => {
  // find a single blogpost by its 'id'
  // be sure to include its associated User and Comment data
  Blogpost.findByPk(req.params.id, {
    include: [{ all: true, nested: true}],
  })
    //   model: User,
    //   attributes: ["name"]
    // },
    // include:
    //   {
    //     model: Comment,
    //     attributes: ["description", "date_created", "user_id"],
    //     required: false,
    //   },
    // })
    // .then((blogposts) => res.status(200).json(blogposts))
    .then((blogpost) => blogpost.get({ plain: true }))
    .then((blogposts) =>
      res.render("blogpost", {
        ...blogposts,
        logged_in: req.session.logged_in,
      })
    );
});

router.post("/", withAuth, async (req, res) => {
  Blogpost.create({
    ...req.body,
    user_id: req.session.user_id,
  })
    .then((blogpost) => res.status(200).json(blogpost))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update blogpost data
  Blogpost.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((blogpost) => {
      // find all associated comments from BlogpostComment
      return BlogpostComment.findAll({ where: { blogpost_id: req.params.id } });
    })
    .then((blogpostComments) => {
      // get list of current comment_ids
      const blogpostCommentIds = blogpostComments.map(
        ({ comment_id }) => comment_id
      );
      const newBlogpostComments = req.body.commentIds
        .filter((comment_id) => !blogpostCommentIds.includes(comment_id))
        .map((comment_id) => {
          return {
            blogpost_id: req.params.id,
            comment_id,
          };
        });
      // figure out which ones to remove
      const blogpostCommentsToRemove = blogpostComments
        .filter(({ comment_id }) => !req.body.commentIds.includes(comment_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        BlogpostComment.destroy({ where: { id: blogpostCommentsToRemove } }),
        BlogpostComment.bulkCreate(newBlogpostComments),
      ]);
    })
    .then((updatedBlogpostComments) =>
      res.status(200).json(updatedBlogpostComments)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  Blogpost.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((blogposts) => {
      console.log(blogposts);
      res.json(blogposts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
