const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5],
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userData) => {
        if (userData.password) {
          userData.password = await bcrypt.hash(userData.password, 3);
        }
      },
      beforeBulkCreate: async (userData) => {
        if (userData.password) {
          userData.password = await bcrypt.hash(userData.password, 3);
        }
      },
      beforeUpdate: async (updatedUser) => {
        if (updatedUser.password) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 3);
        }
      },
    },

    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;