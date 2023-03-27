const { productModel } = require('../models');
const schema = require('./validations/validationsInputs');

const findAll = async () => {
  const product = await productModel.findAll();
  return { type: null, message: product };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  console.log('@@@@@@@@@@@@@@@@@@@ PRODUCTSERVICE', product);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (product) => {
  const error = schema.validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productModel.insert(product);
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};