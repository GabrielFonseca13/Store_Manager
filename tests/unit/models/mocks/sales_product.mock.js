const saleFirstCall = 4;

const saleProductMock = {
  productId: 1,
  quantity: 4,
};

const allSalesMock = [
  { saleId: 1, productId: 1, quantity: 5 },
  { saleId: 1, productId: 2, quantity: 10 },
  { saleId: 2, productId: 3, quantity: 15 },
  { saleId: 3, productId: 1, quantity: 1 },
  { saleId: 3, productId: 2, quantity: 5 }
];

const responseId = [
  { saleId: 1, productId: 1, quantity: 5 },
  { saleId: 1, productId: 2, quantity: 10 }
];

module.exports = {
  saleFirstCall,
  saleProductMock,
  allSalesMock,
  responseId
}