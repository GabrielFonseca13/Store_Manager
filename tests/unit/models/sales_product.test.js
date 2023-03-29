const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel, salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { saleProductMock, allSalesMock, responseId } = require('./mocks/sales_product.mock');


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
  // describe('Listando todas as vendas com quantidades', function() {
  //   it('retorna um array com todas as vendas e os produtos e quantidade', async function() {
  //     // arrange
  //     sinon.stub(connection, 'execute').resolves([allSalesMock]);
  //     // act
  //     const result = await salesProductsModel.findAll();
  //     // assert
  //     expect(result).to.deep.equal(allSalesMock);
  //   });
  //     it('retorna as vendas, os produtos e quantidade através do id', async function () {
  //     // arrange
  //     sinon.stub(connection, 'execute').resolves([responseId]);
  //     // act
  //     const result = await salesProductsModel.findById(1);
  //     // assert
  //     expect(result).to.be.deep.equal(responseId);
  //   })
  // });
  afterEach(function () {
    sinon.restore();
  })
});
