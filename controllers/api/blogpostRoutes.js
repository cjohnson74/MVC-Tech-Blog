const router = require("express").Router();
const { Blogpost, BlogpostComment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    Blogpost.findAll({
        include: [
            User,
          {
            model: Comment,
            through: BlogpostComment,
          },
        ],
      })
  
      // Serialize data so that template can read it.
      .then((blogpostData) => blogpostData.map((blogpost) =>
        blogpost.get({ plain: true })
      ))
  
      // Pass serialized data and session flag into template
      .then((blogposts) => res.render("homepage", {
        blogposts,
        logged_in: req.session.logged_in,
      }))
      .catch((err) => {
      res.status(500).json(err);
    })
});

  router.get("/:id", async (req, res) => {
  Blogpost.findByPk(req.params.id, {
    where: {
      id: req.params.id,
    },
    include: [
      User,
      {
        model: Comment,
        through: BlogpostComment,
      },
    ],
  })
    .then((blogpost) => res.status(200).json(blogpost))
    // res.render('blogpost', {
    //   ...blogposts,
    //   logged_in: req.session.logged_in
    // });
    .catch((err) => {
      res.status(500).json(err);
    });
  });

router.post("/", withAuth, async (req, res) => {
    Blogpost.create({
            ...req.body,
            user_id: req.session.user_id,
    })
    .then((blogpost) => {
        if (req.body.commentIds && req.body.commentIds.length) {
            const blogpostCommentIdArr = req.body.commentIds.map((comment_id) => {
                return {
                blogpost_id: blogpost.id,
                comment_id,
            };
        });
        return BlogpostComment.bulkCreate(blogpostCommentIdArr);
    }
    res.status(200).json(blogpost);
    })
        .then((blogpostCommentIds) => res.status(200).json(blogpostCommentIds))
      .catch((err) => {
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
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
        const blogpostCommentIds = blogpostComments.map(({ comment_id }) => comment_id);
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
    .then((updatedBlogpostComments) => res.status(200).json(updatedBlogpostComments))
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