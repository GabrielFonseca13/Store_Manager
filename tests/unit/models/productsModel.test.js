const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { productList, newProduct, newName } = require('./mocks/product.model.mock');

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
    });
    describe('Cadastrando um novo produto', function () {
      it('Atualizando o nome de um produto com dados válidos', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        // Act
        const result = await productModel.update(newName, 1);
        // Assert
        expect(result).to.equal(1);
      });
    })
    describe('Deletando um produto', function () {
      it('com id existente', async function () {
        // Arrange
        // sinon.stub(connection, 'delete').resolves([{ affectedRows: 1 }]);
        // Act
        const result = await productModel.delete(3);
        console.log('#############', result);
        // Assert
        // expect(result).to.equal(1);
      });
    });
  });
  afterEach(function () {
    sinon.restore()
  });
});