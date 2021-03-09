'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Counter.init({
    clients: DataTypes.INTEGER,
    peers: DataTypes.INTEGER,
    ratings: DataTypes.INTEGER,
    business: DataTypes.INTEGER,
    changesRequests: DataTypes.INTEGER,
    administrators: DataTypes.INTEGER,
    ownerAprovals: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Counter',
  });
  return Counter;
};