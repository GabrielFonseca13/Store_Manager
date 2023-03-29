const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allSalesMock, expectedResposeGetSaleById } = require('./mocks/sales.model.mock');


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
  describe('Listando as vendas', function() {
    it('retorna um array com todas as vendas', async function() {
      // arrange
      sinon.stub(connection, 'execute').resolves([allSalesMock]);
      // act
      const result = await salesModel.getDetailedSales();
      // assert
      expect(result).to.deep.equal(allSalesMock)
    });
    it('retorna um array com todas os produtos e quantidades da venda, atraves do seu id', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([expectedResposeGetSaleById])
      
      // act
      const result = await salesModel.getDetailedSalesById(1);
      
      // assert
      expect(result).to.deep.equal(expectedResposeGetSaleById);
    });
  });
  afterEach(function () {
    sinon.restore();
  })
});

