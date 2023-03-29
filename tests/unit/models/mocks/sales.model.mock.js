const newSale = { id: 3, date: '2023-03-26 17:20:06' };

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

const expectedResposeGetSaleById = [
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
  newSale,
  allSalesMock,
  expectedResposeGetSaleById
};