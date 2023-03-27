const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel, salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { saleProductMock } = require('./mocks/sales_product.mock');


describe('Testes da SalesProducts Model', () => {
  describe('cadastrando uma nova venda', function() {
    it('com dados válidos', async function() {
      // arrange
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      // act
      const newSaleId = await salesModel.insert()
      const { productId, quantity } = saleProductMock;
      const result = await salesProductsModel.insert({ saleId: newSaleId, productId, quantity });
      // assert
      expect(result).to.equal(1)
    });
  });
  afterEach(function () {
    sinon.restore();
  })
});
