const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Blogpost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blogpost.belongsToMany(Comment, {
    through: BlogpostComment,
    foreignKey: 'blogpost_id'
});

Comment.belongsToMany(Blogpost, {
    through: BlogpostComment,
    foreignKey: 'comment_id'
});

module.exports = { User, Blogpost, Comment };