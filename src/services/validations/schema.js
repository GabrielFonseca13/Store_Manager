const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

// const itemSaleSchema = Joi.object({
//   productId: Joi.number().integer().min(1).required,
//   quantity: Joi.number().integer().min(1).required,
// });

// const addNewSaleSchema = Joi.array().items(itemSaleSchema);

module.exports = {
  idSchema,
  addProductSchema,
  // addNewSaleSchema,
};