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

module.exports = {
  newSaleId,
  itemsSold,
  expectedRetundNewSalePost,
  itemsSoldWithoutProductId,
  itemsSoldWithoutQuantity
}