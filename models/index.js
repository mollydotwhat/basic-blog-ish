//import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// define sequelize relationships

User.hasMany(Post, {
    foreignKey, //user id
    onDelete
});
Post.belongsTo(User, {
    foreignKey //user id
});

User.hasMany(Comment, {
    foreignKey, //user id? or comment id??? confused now
    onDelete
});
Comment.belongsTo(User, {
    foreignKey //user id
});

Post.hasMany(Comment, {
    foreignKey, //comment id
    onDelete
});
Comment.belongsTo(Post, {
    foreignKey //post id
});



module.exports = { User, Post, Comment }