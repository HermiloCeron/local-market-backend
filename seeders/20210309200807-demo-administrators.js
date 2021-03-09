'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Administrators', [
      {
        administratorId: 1,
        clientId: 1
      },
      {
          administratorId: 2,
          clientId: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Administrators', null, {});
  }
};
