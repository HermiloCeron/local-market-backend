'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Counters', [
      {
        clients: 8,
        peers: 12,
        ratings: 32,
        business: 12,
        changesRequests: 2,
        administrators: 2,
        ownerAprovals: 1
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Counters', null, {});
  }
};
