"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("lead", "companyId", "company_id");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("lead", "company_id", "companyId");
  },
};
