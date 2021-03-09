'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChangeRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ChangeRequest.init({
    changeId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    webpage: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    photo: DataTypes.STRING,
    telephone: DataTypes.STRING,
    foodCategory: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChangeRequest',
  });
  return ChangeRequest;
};