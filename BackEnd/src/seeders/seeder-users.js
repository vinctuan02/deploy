module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        email: 'vinc02@gmail.com',
        password: '1234',
        firstName: 'Tuan',
        lastName: 'Nguyen',
        address: 'Ha Noi',
        phonenumber: '0111',
        gender: 1,
        image: 'Image',
        roleId: 'ROLE',
        positionId: 'R1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };
