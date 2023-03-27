const { salesModel, salesProductsModel, productModel } = require('../models');

const newSalePost = async (salesProducts) => {
  const products = await Promise.all(
    salesProducts.map(async ({ productId }) => productModel.findById(productId)),
  );
  console.log('PRODUCT', products);
    const someProductIsMissing = products.some((product) => product === undefined);
  if (someProductIsMissing) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };  
  
  const newSale = await salesModel.insert();
  // console.log(newSale);
  await Promise.all(
    salesProducts.map(async (saleProduct) => {
      const { productId, quantity } = saleProduct;
      await salesProductsModel.insert({ saleId: newSale, productId, quantity });
    }), 
  );
  
  const response = {
    id: newSale,
    itemsSold: salesProducts,
  };      
  
  return { type: null, message: response };
};

module.exports = {
  newSalePost,
};