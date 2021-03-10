'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.hasMany(models.Rating,{foreignKey: "clientId"});
      Client.hasMany(models.Peer,{foreignKey: 'clientId'});
    }
  };
  Client.init({
    clientId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    eMail: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};