const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel, salesModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');
const { newSaleId, expectedRetundNewSalePost, itemsSold } = require('./mocks/sales.service.mock');

describe('Testando a service de Sales', function () {
  describe('Cadastrando uma nova venda', function () {
    it('Com dados válidos', async function () {
      // arrange
      sinon.stub(salesModel, 'insert').resolves(newSaleId);
      sinon.stub(salesProductsModel, 'insert')
        .onFirstCall().resolves(1)
        .onSecondCall().resolves(1);

      // act
      const result = await salesService.newSalePost(itemsSold);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(expectedRetundNewSalePost);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});