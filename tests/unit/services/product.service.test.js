const { expect } = require('chai');
const sinon = require('sinon');
const { productModel, salesModel } = require('../../../src/models');

const { productService } = require('../../../src/services');
const {
  productList,
  invalidValue,
  newProductMockResponse,
  newProduct,
  expectedUpdateResponse
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
      expect(result.message).to.deep.equal('"id" must be a number');
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
  describe('Atualizando um produto', function () {
    it('com Id válido', async function () {
      // arrange
      sinon.stub(productModel, 'update').resolves(expectedUpdateResponse)
      // act
      const result = await productService.updateProduct(newProduct, 1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(expectedUpdateResponse);
    });
    it.only('com Id inexistente', async function () {
      // arrange
      sinon.stub(productModel, 'update').resolves();
      // act
      const result = await productService.updateProduct(newProduct, 999);
      console.log('#########################', result)
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    })
  })
  afterEach(function () {
    sinon.restore()
  });
});
