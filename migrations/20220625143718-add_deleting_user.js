'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'deleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'deleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  }
};
