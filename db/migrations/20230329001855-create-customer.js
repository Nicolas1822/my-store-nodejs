'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../model/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
