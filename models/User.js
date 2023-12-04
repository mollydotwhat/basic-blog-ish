const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    //verify with bcrypt
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

User.init(
  {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

  },

  {
    hooks: {
        //bcrypt does passwords
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        },
      },
    sequelize, 
    timestamps: true,
    underscored: true,
    modelName: 'User',
  }
);

module.exports = User;