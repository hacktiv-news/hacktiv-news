'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.User);
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'News'
    }
  );
  return News;
};
