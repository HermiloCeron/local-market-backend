'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OwnerAprovals', [
      {
        aprovalId: 1,
        clientId: 1,
        previousOwner: 6,
        businessId: 12,
        message: "please",
        status: 0
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OwnerAprovals', null, {});
  }
};
