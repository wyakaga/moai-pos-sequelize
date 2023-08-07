'use strict';

const { faker } = require('@faker-js/faker/locale/id_ID');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = Array.from({ length: 5 }).map(() => ({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(process.env.USER_SEED_PWD, 10),
    }))

    await queryInterface.bulkInsert('Users', users, {});
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
