const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Comment.findAll({
    include: Blogpost,
  })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Comment.create({
    ...req.body,
    user_id: req.session.user_id,
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
