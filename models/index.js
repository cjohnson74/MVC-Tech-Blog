const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');
const BlogpostComment = require('./BlogpostComment');

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Blogpost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Blogpost, {
    through: BlogpostComment,
    foreignKey: 'comment_id'
});

Blogpost.belongsToMany(Comment, {
    through: BlogpostComment,
    foreignKey: 'blogpost_id',
});

module.exports = { User, Blogpost, Comment, BlogpostComment };