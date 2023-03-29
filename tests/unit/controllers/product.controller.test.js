const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { listProducts } = require('../../../src/controllers/product.controller');
const { productService } = require('../../../src/services');
const { productList, invalidValue, newProduct, newProductMock } = require('./mocks/product.controller.mock');

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
      expect(res.json).to.have.been.calledWith({message: '"id" must be a number'});
    });
    it('Buscando um produto com id inexistente', async function () {
      const res = {};
      const req = {
        params: { id: 999 }
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
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
  describe('Cadastrando um novo produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      // Arrange
      const res = {};
      const req = {
        body: newProduct,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: null, message: newProductMock });

      // Act
      await productController.createProduct(req, res);

      // Assert
      
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
    it('ao enviar dados inválidos deve retornar erro', async function () {
      // Arrange
      const res = {};
      const req = {
        body: {name: invalidValue}
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });

      // Act
      await productController.createProduct(req, res);

      // Assert
      
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long'});
    });
  });
  describe('Atualizado os dados de um produto', function () {
    it('Com id válido', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: newProduct}
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct')
        .resolves({ type: null, message: newProductMock });
      // act
      await productController.updatedProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
    it('Com id inválido', async function () {
      const res = {};
      const req = {
        params: { id: 999 },
        body: { name: newProduct}
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      await productController.updatedProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('deletando um produto', function () {
    it('Com id válido', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteProduct')
        .resolves({ type: null });
      // act
      await productController.deleteProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(204);
    });
    it('Com id inexistente', async function () {
      const res = {};
      const req = {
        params: { id: 999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message:'Product not found' });
      // act
      await productController.deleteProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('Com id inválido', async function () {
      const res = {};
      const req = {
        params: { id: invalidValue },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
      // act
      await productController.deleteProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });  
  });
  afterEach(function () {
    sinon.restore();
  });
});