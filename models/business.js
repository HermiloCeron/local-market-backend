'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Business.hasMany(models.Rating,{foreignKey: "businessId"});
      Business.belongsToMany(models.Client,{
        through: 'Rating',
        foreignKey: 'businessId',
        otherKey: 'clientId'
      })
    }
  };
  Business.init({
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
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};