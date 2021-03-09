'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Peer.init({
    peerId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    peerClientId: DataTypes.INTEGER,
    compatibilityIndex: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Peer',
  });
  return Peer;
};