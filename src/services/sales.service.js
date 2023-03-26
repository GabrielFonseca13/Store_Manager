const { salesModel, salesProductsModel } = require('../models');

const newSalePost = async (salesProducts) => {
  // TODO criar validações
  const newSale = await salesModel.insert();
  
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