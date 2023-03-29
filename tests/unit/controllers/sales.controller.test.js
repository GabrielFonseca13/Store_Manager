const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const validateHasProductId = require('../../../src/middlewares/validateHasProductId');
const validateQuantity = require('../../../src/middlewares/validateQuantity');
const { salesService } = require('../../../src/services');
const { itemsSold, expectedRetundNewSalePost, itemsSoldWithoutProductId, salesListMock } = require('./mocks/sales.controller.mock');
const { expect } = chai;
chai.use(sinonChai);

describe('Testes Sales Controller', function () {
  describe('Cadastrando uma nova venda com dados válidos', function () {
    it('retorna o status 201 e o objeto de resposta completo', async function () {
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
  describe('Cadastrando uma nova venda faltando dados obrigatórios', function () {
      it('Cadastrando sem productId retorna o status 400 e a mensagem productId is required', async function () {
        const res = {};
        const req = {
          body: [
            {
              'quantity': 1
            }
          ]
        };
          
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
              
        await validateHasProductId(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ "message": '"productId" is required' });
      });
  });
  describe('Cadastrando uma nova venda com dados do campo quantity inválidos', function () {
      it('Cadastrando com quantity 0', async function () {
        const res = {};
        const req = {
          body: [
            {
              'productId': 1,
              'quantity': 0
            }
          ]
        };
          
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
              
        await validateQuantity(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
      });
  });
  describe('Listando as vendas', function () {
    it('Deve retornar o status 200 e a lista de vendas com horario', async function () {
      // // arrange
      // const res = {};
      // const req = {};

      // res.status = sinon.stub().returns(res);
      // res.json = sinon.stub().returns();
      // sinon
      //   .stub(salesService, 'findAll')
      //   .resolves({ type: null, message: salesListMock });
      // // act
      // await salesController.listSales(req, res);
      // // assert
      // expect(res.status).to.have.been.calledWith(200);
      // expect(res.json).to.have.been.calledWith(salesListMock);
    });
    it('Busca uma venda pelo seu id', async function () {
      // // arrange
      // const res = {};
      // const req = {
      //   params: { id: 1 }
      // }

      // res.status = sinon.stub().returns(res);
      // res.json = sinon.stub().returns();

      // sinon.stub(salesService, 'findById')
      //   .resolves({ type: null, message: salesListMock[0] });
      // // act
      // await salesController.getSaleById(req, res);
      // // assert
      // expect(res.status).to.have.been.calledWith(200);
      // expect(res.json).to.have.been.calledWith(salesListMock[0]);
    });
  });
  
  afterEach(function() {
    sinon.restore();
  })
});

