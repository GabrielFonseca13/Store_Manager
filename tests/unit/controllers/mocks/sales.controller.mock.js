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


const expectedRetundNewSalePost = {
  'id': 3,
  'itemsSold': [
    {
      'productId': 1,
      'quantity': 1
    },
    {
      'productId': 2,
      'quantity': 5
    }
  ]
};

const itemsSoldWithoutProductId = [
  {
    'quantity': 1
  },
  {
    'productId': 2,
    'quantity': 5
  }
];

const itemsSoldWithoutQuantity = [
  {
    'productId': 1,
  },
  {
    'productId': 2,
    'quantity': 5
  }
];

const allSalesMock = [
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
    date: '2023-03-28T22:04:18.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2023-03-28T22:04:18.000Z',
    productId: 2,
    quantity: 10
  },
];

module.exports = {
  newSaleId,
  itemsSold,
  expectedRetundNewSalePost,
  itemsSoldWithoutProductId,
  itemsSoldWithoutQuantity,
  allSalesMock,
  expectedResponseSaleById
}