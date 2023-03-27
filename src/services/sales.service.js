const { salesModel, salesProductsModel } = require('../models');
const { validateNewSale, validateProductExists } = require('./validations/validationsInputs');

const newSalePost = async (salesProducts) => {
  // TODO criar validações
  let error = validateNewSale(salesProducts);
  if (error.type) return error; 
  error = await validateProductExists(salesProducts);
  if (error.type) return error; 
  
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