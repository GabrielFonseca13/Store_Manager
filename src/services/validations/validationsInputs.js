const { idSchema, addProductSchema, addNewSaleSchema } = require('./schema');

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

const validateNewSale = (arraySalesReq) => {
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
};