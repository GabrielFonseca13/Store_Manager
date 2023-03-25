const invalidValue = 'a';

const productList = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const newProduct = 'Manopla do Infinito';

const newProductMockResponse = {
  id: 4,
  name: newProduct,
}

module.exports = {
  productList,
  invalidValue,
  newProduct,
  newProductMockResponse
}