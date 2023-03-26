const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel, salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { saleFirstCall, saleProductMock } = require('./mocks/sales_model.mock');


describe('Testes da SalesProducts Model', () => {
  describe('cadastrando uma nova venda', function() {
    it('com dados válidos', async function() {
      // arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 3}]);
      // act
      const newSaleId = await salesModel.insert()
      const { productId, quantity } = saleProductMock;
      const result = await salesProductsModel.insert({ saleId: newSaleId, productId, quantity });
      // assert
      expect(result).to.equal(3)
    });
  });
});
