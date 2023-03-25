const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const { productService } = require('../../../src/services');
const {
  productList,
  invalidValue,
  newProductMock,
  newProductMockResponse,
  newProduct
} = require('./mocks/product.service.mock');

describe('Testes Service Products', function () {
  describe('Listando os produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productModel, 'findAll').resolves(productList);
      // act
      const result = await productService.findAll();
      // assert
      expect(result.type).to.equal(null)
      expect(result.message).to.deep.equal(productList)
    });
    it('Buscando um produto com id válido', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves(productList[0]);
      // act
      const result = await productService.findById(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productList[0]);
    });
    it('Buscando um produto através de id Inválido', async function () {
      // act
      const result = await productService.findById(invalidValue);
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal({ message:'"id" must be a number' });
    })
    it('Buscando um produto através de id não existente', async function () {
      sinon.stub(productModel, 'findById').resolves();
      // act
      const result = await productService.findById(999);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    })
  });
  describe('Cadastrando um produto com valores válidos', function () {
    it('retorna o ID e o produto cadastrado', async function () {
      // arrange
      sinon.stub(productModel, 'insert').resolves(4);
      sinon.stub(productModel, 'findById').resolves(newProductMockResponse);
      
      // act
      const result = await productService.createProduct(newProduct);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newProductMockResponse);
    });
  });
  describe('cadastro de um novo produto com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      // arrange
      // act
      const result = await productService.createProduct(invalidValue);
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
    it('retorna um erro ao passar dados inexistentes', async function () {
      // arrange
      // act
      const result = await productService.createProduct();
      // assert
      // expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" is required');
    });
  });
  afterEach(function () {
    sinon.restore()
  });
});
