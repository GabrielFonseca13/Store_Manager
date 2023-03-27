const { productModel } = require('../../models');
const { idSchema, addProductSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateProductExists = async (arraySalesReq) => {
  const products = await Promise.all(
    arraySalesReq.map(async (item) => productModel.findById(item.productId)),
  );

  const someProductIsMissing = products.some((product) => product === undefined);
  if (someProductIsMissing) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateNewSale = async (arraySalesReq) => {
  const invalidItem = arraySalesReq.find((item) => item.quantity <= 0);
  if (invalidItem) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
  validateProductExists,
};