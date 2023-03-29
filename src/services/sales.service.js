const { salesModel, salesProductsModel } = require('../models');
const { validateProductExists } = require('./validations/validationsInputs');
// const schema = require('./validations/validationsInputs');

const newSalePost = async (salesProducts) => {
  const error = await validateProductExists(salesProducts);
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

// const findAll = async () => {
//   const sales = await salesModel.findAll();
//   return { type: null, message: sales };
// };

// const findById = async (saleId) => {
//   const error = schema.validateId(saleId);
//   if (error.type) return error;

//   const sale = await salesModel.findById(saleId);

//   if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

//   return { type: null, message: sale };
// };

// const getAllDetailedSales = async (saleId) => {
//   const error = schema.validateId(saleId);
//   if (error.type) return error;
// };

module.exports = {
  newSalePost,
  // findAll,
  // findById,
};