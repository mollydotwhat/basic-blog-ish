const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

//associate with user
class Post extends Model { };
Post.init(
{
    title: {
        type: DataTypes.STRING,

    },
    post_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: "User",
            key: "id"
        }
    },

},
{
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'Post'
  }
);

module.exports = Post;