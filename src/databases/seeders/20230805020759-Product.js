'use strict';

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = Array.from({ length: 50 }).map(() => ({
      productName: faker.commerce.productName(),
      productPrice: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      picture: faker.image.urlLoremFlickr({category: "products"})
    }));

    await queryInterface.bulkInsert("Products", products, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
