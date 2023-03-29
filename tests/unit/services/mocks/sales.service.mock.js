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

const salesListMock = [
  { id: 1, date: '2023-03-29T00:16:37.000Z' },
  { id: 2, date: '2023-03-29T00:16:37.000Z' }
];

const responseId = { id: 1, date: '2023-03-29T00:38:36.000Z' }

module.exports = {
  newSaleId,
  itemsSold,
  expectedReturnNewSalePost,
  productList,
  itemsSoldWithWrongId,
  salesListMock,
  responseId
}

