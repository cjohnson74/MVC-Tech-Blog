const router = require("express").Router();
const { Comment, User, Blogpost } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
    Comment.findAll({
      include: Blogpost,
    })
      .then((comment) => res.status(200).json(comment))
      .catch((err) => {
        res.status(500).json(err);
      });
  });

router.get("/:id", (req, res) => {
    // find a single comment by its 'id'
    // be sure to include its associated Blogpost data
    Comment.findByPk(req.params.id, {
        where: {
            id: req.params.id,
        },
        include: Blogpost,
        where: {
            comment_id: req.params.id,
        },
    })
        .then((comment) => {
            if(!comment) {
                res.status(404).json({ message: "No comment found with this id!" });
                return;
            }
            res.status(200).json(tag)
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/", withAuth, (req, res) => {
    // create a new comment
  Comment.create({
    ...req.body,
    user_id: req.session.user_id,
    blogpost_id: req.body.blogpost_id,
  })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((comment) => {
      console.log(comment);
      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
