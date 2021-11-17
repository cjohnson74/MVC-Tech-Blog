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
        include: Blogpost,
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
    description: req.body.description,
    user_id: req.session.user_id,
    blogpostId: req.body.blogpost_id,
  })
    .then((comment) => res.status(200).json(comment))
//   BlogpostComment.create({
//       blogpost_id: req.body.blogpost_id,
//   })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
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
