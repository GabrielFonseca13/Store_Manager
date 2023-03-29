const { salesModel, salesProductsModel } = require('../models');
const { validateProductExists } = require('./validations/validationsInputs');

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

const getAllDetailedSales = async () => {
  const sales = await salesModel.getDetailedSales();
  return { type: null, message: sales };
};

const getDetailedSalesById = async (saleId) => {
  const sale = await salesModel.getDetailedSalesById(saleId);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  newSalePost,
  getAllDetailedSales,
  getDetailedSalesById,
};