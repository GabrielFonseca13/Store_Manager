const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { itemsSold, expectedRetundNewSalePost } = require('./mocks/sales.controller.mock');
const { expect } = chai;
chai.use(sinonChai);

describe('Testes Sales Controller', function () {
  describe('Cadastrando uma nova venda', function () {
    it.only('com dados válidos', async function () {
      const res = {};
      const req = {
        body: itemsSold,
      };
        
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
        
      sinon
        .stub(salesService, 'newSalePost')
        .resolves({ type: null, message: expectedRetundNewSalePost });
      
      await salesController.insertNewSale(req, res);
      
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledWith(expectedRetundNewSalePost);
    });
  });
  afterEach(function() {
    sinon.restore();
  })
});

