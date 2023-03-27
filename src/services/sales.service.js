const { salesModel, salesProductsModel } = require('../models');
const { validateNewSale } = require('./validations/validationsInputs');

const newSalePost = async (salesProducts) => {
  // TODO criar validações
  const error = validateNewSale(salesProducts);
  if (error.type) return error; 
    
  const newSale = await salesModel.insert();
  
  await Promise.all(
    salesProducts.map(async (saleProduct) => {
      const { productId, quantity } = saleProduct;
      // await productModel.findById(productId);
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