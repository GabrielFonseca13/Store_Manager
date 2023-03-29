const { expect } = require('chai');
const sinon = require('sinon');
const validateHasQuantity = require('../../../src/middlewares/validateHasQuantity');
const { salesProductsModel, salesModel, productModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');
const { expectedReturnNewSalePost, itemsSold, productList, itemsSoldWithWrongId, salesListMock, responseId,  } = require('./mocks/sales.service.mock');

describe('Testando a service de Sales', function () {
  describe('Cadastrando uma nova venda com dados válidos', function () {
    it('O retorno é null e o objeto esperado', async function () {
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
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(expectedReturnNewSalePost);
      
    });
  });
  describe('Cadastrando uma nova venda com produtos inexistentes', function () {
    it('retorna o erro 404 e a mensagem product not found', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves()

      // act
      const result = await salesService.newSalePost(itemsSoldWithWrongId);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });
  describe('Cadastrando uma nova venda faltando dados obrigatórios', function () {
    it('Cadastrando sem quantity retorna o status 400 e a mensagem quantity is required', async function () {
      const res = {};
      const req = {
        body: [
          {
            'productId': 1
          }
        ]
      };
        
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
            
      await validateHasQuantity(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ "message": '"quantity" is required' });
    });
  });
  describe('Listando as vendas', function () {
    it('retorna a lista con todas as vendas', async function () {
      // arrange
      // act
      // assert
    });
       it('Buscando uma venda atraves de id válido', async function () {
      // arrange
      // act      
      // assert
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});