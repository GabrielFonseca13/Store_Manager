const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { listProducts } = require('../../../src/controllers/product.controller');
const { productService } = require('../../../src/services');
const { productList, invalidValue } = require('./mocks/product.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes unitários de Product Controller', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: productList });
      // act
      await productController.listProducts(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });
    it('Buscando um produto pelo seu id', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 }
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById')
        .resolves({ type: null, message: listProducts[0] });
      // act
      await productController.getProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listProducts[0]);
    });
    it('Buscando um produto com id inválido', async function () {
      const res = {};
      const req = {
        params: { id: invalidValue }
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
      // act
      await productController.getProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
    it('Buscando um produto com id inexistente', async function () {
      const res = {};
      const req = {
        params: { id: 999 }
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      // sinon.stub(productService, 'findById')
      //   .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      await productController.getProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    afterEach(function() {
      sinon.restore();
    });
  });
});