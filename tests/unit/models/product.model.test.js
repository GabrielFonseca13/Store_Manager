const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { productList, newProduct } = require('./mocks/product.model.mock');

describe('Testes da Model Products', function () {
  describe('Listando produtos', function () {

    it('retorna a lista de produtos', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([productList]);
      // act
      const result = await productModel.findAll();
      // assert
      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(productList);
    });
    it('retorna o produto atraves do seu id', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[productList[0]]]);
      // act
      const result = await productModel.findById(1);
      // assert
      expect(result).to.be.deep.equal(productList[0]);
    })
  describe('Cadastrando um novo produto', function () {
    it('Cadastrando um produto com dados válidos', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      // Act
      const result = await productModel.insert(newProduct);
      // Assert
      expect(result).to.equal(4);
    });  
  })
  });
  afterEach(function () {
    sinon.restore()
  });
});