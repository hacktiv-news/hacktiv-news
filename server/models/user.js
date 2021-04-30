'use strict';
const { Model } = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.News);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email tidak boleh kosong'
          },
          isEmail: {
            args: true,
            msg: 'Email tidak sesuai format'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password tidak boleh kosong'
          },
          len: {
            args: [8, 32],
            msg: 'Password 8-32 karakter'
          }
        }
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate(dataPass) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(dataPass.password, salt);
          dataPass.password = hash;
        }
      },
      modelName: 'User'
    }
  );
  return User;
};
