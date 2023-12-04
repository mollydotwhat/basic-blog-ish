const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

//associate comment with post and user
class Comment extends Model { };
Comment.init(
{
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: "User",
            key: "id"
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Post",
            key: "id"
        }
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
{
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'Comment'
  }
);

module.exports = Comment;