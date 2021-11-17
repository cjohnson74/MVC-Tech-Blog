const User = require("./User");
const Blogpost = require("./Blogpost");
const Comment = require("./Comment");

Blogpost.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Blogpost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blogpost, {
  foreignKey: "blogpost_id",
  as: "blogpost",
});

Blogpost.hasMany(Comment, {
  as: "comments",
});

module.exports = { User, Blogpost, Comment };
