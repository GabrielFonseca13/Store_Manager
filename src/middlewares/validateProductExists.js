const { productModel } = require('../models');

module.exports = async (req, res, next) => {
  const itemsSold = req.body;
  
  const products = await Promise.all(
    itemsSold.map(async ({ productId }) => productModel.findById(productId)),
  );
    
    const someProductIsMissing = products.some((product) => product === undefined);
    if (someProductIsMissing) return res.status(404).json({ message: 'Product not found' });
  return next();
};