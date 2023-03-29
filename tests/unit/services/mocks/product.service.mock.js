const invalidValue = 'a';

const productList = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const newProduct = 'Manopla do Infinito';

const expectedUpdateResponse = {
  id: 1,
  name: newProduct
};

const newProductMockResponse = {
  id: 4,
  name: newProduct,
};

module.exports = {
  productList,
  invalidValue,
  newProduct,
  newProductMockResponse,
  expectedUpdateResponse,
}