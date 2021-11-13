const router = require("express").Router();
const { Blogpost } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  Blogpost.create({
    ...req.body,
    user_id: req.session.user_id,
  })
    .then((blogpost) => {
      if (req.body.commentIds && req.body.tagIds.length) {
        const blogpostCommentIdArr = req.body.commentIds.map((comment_id) => {
          return {
            blogpost_id: blogpost.id,
            comment_id,
          };
        });
        return BlogPostComment.bulkCreate(blogpostCommentIdArr);
      }
      res.status(200).json(blogpost);
    })
    .then((blogpostCommentIds) => res.status(200).json(blogpostCommentIds))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: "No blogpost found with this id!" });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
