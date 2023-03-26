const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');


describe('Testes da Sales Model', () => {
  describe('cadastrando uma nova venda', function() {
    it('com dados válidos', async function() {
      // arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 3}]);
      // act
      const result = await salesModel.insert();
      // assert
      expect(result).to.equal(3)
    });
  });
  afterEach(function () {
    sinon.restore();
  })
});

