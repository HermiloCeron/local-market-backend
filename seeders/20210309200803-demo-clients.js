'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [
      {
        clientId: 1,
        username: "superman1",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    },
    {
        clientId: 2,
        username: "superman2",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    },
    {
        clientId: 3,
        username: "superman3",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    },
    {
        clientId: 4,
        username: "superman4",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    },
    {
        clientId: 5,
        username: "superman5",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    },
    {
        clientId: 6,
        username: "superman6",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    },
    {
        clientId: 7,
        username: "superman7",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    },
    {
        clientId: 8,
        username: "superman8",
        password: "canfly",
        eMail: "",
        locationId: "MX_NLE"
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
