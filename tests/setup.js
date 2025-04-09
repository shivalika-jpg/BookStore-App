


process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.NODE_ENV = 'test';


jest.mock('../src/models', () => {
  const { mockDeep } = require('jest-mock-extended');
  const models = {
    User: {
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn()
    },
    Book: {
      findByPk: jest.fn(),
      findOne: jest.fn(),
      findAndCountAll: jest.fn(),
      create: jest.fn()
    },
    sequelize: {
      authenticate: jest.fn().mockResolvedValue(true),
      sync: jest.fn().mockResolvedValue(true)
    }
  };
  
  return models;
});
