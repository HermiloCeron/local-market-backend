'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ChangeRequests', [
      {
        changeId: 1,
        clientId: 1,
        businessId: 10,
        name: "Palax",
        description: "A nice restaurant",
        address: "",
        webpage: "",
        facebook: "",
        instagram: "",
        whatsapp: "",
        photo: "https://media-cdn.tripadvisor.com/media/photo-s/15/51/44/f0/photo2jpg.jpg",
        telephone: "+52 81 8347 8828",
        foodCategory: "Snack",
        ownerId: 5,
        location: "MX_NLE",
        status: 0
      },
      {
          changeId: 2,
          clientId: 1,
          businessId: 11,
          name: "Panem Bakery & Bistro (Nativa)",
          description: "",
          address: "Av. Alfonso Reyes 901 Plaza Nativa, L#35, San Pedro Garza García, Monterrey 66248 México",
          webpage: "",
          facebook: "",
          instagram: "",
          whatsapp: "",
          photo: "https://media-cdn.tripadvisor.com/media/photo-f/07/ae/7a/06/panem-bakery-bistro.jpg",
          telephone: "",
          foodCategory: "Dessert",
          ownerId: 6,
          location: "MX_NLE",
          status: 0
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ChangeRequests', null, {});
  }
};
