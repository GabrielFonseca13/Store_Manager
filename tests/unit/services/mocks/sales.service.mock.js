const newSaleId = 3;
const itemsSold = [
  {
    'productId': 1,
    'quantity': 1
  },
  {
    'productId': 2,
    'quantity': 5
  }
];


const expectedReturnNewSalePost = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const productList = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const itemsSoldWithWrongId = [
  {
    'productId': 999,
    'quantity': 1
  }
];

module.exports = {
  newSaleId,
  itemsSold,
  expectedReturnNewSalePost,
  productList,
  itemsSoldWithWrongId,
}

