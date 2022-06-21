'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Users', {
      type: 'unique',
      fields: ['email'],
      name: 'email',
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Users', 'email');
  }
};
