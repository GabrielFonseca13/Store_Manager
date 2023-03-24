const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const { productService } = require('../../../src/services');
const { productList, invalidValue } = require('./mocks/product.service.mock');

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
  afterEach(function () {
    sinon.restore()
  });
});
