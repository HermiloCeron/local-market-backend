'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnerApproval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OwnerApproval.init({
    aprovalId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    previousOwner: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OwnerApproval',
  });
  return OwnerApproval;
};