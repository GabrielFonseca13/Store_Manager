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
    {
      saleId: 1,
      date: '2023-03-29T01:04:18.000Z',
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date: '2023-03-29T01:04:18.000Z',
      productId: 2,
      quantity: 10
    },
    {
      saleId: 2,
      date: '2023-03-29T01:04:18.000Z',
      productId: 3,
      quantity: 15
    }
  ];

const expectedResponseSaleById = [
    {
      saleId: 1,
      date: '2023-03-29T01:04:18.000Z',
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date: '2023-03-29T01:04:18.000Z',
      productId: 2,
      quantity: 10
    }
  ]

module.exports = {
  newSaleId,
  itemsSold,
  expectedReturnNewSalePost,
  productList,
  itemsSoldWithWrongId,
  salesListMock,
  expectedResponseSaleById
}

