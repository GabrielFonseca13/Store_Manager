const { expect } = require('chai');
const sinon = require('sinon');
const { salesProductsModel, salesModel, productModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');
const { expectedReturnNewSalePost, itemsSold, productList } = require('./mocks/sales.service.mock');

describe('Testando a service de Sales', function () {
  describe('Cadastrando uma nova venda', function () {
    it('Com dados válidos', async function () {
      // arrange
      sinon.stub(productModel, 'findById')
        .onCall(0)
        .resolves(productList[0])
        .onCall(1)
        .resolves(productList[1]);

      sinon.stub(salesModel, 'insert').resolves(3);
      
      sinon.stub(salesProductsModel, 'insert')
        .onCall(0).resolves(1)
        .onCall(1).resolves(1);
      
      // act
      const result = await salesService.newSalePost(itemsSold);
      // assert
      console.log('###################### RESULT', result);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(expectedReturnNewSalePost);
      
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});