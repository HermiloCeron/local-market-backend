'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Administrator.init({
    administratorId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Administrator',
  });
  return Administrator;
};