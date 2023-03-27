module.exports = (req, res, next) => {
  const itemsSold = req.body;
  
  const productId = [];
  
  itemsSold.forEach((itemSold) => {
    if (!itemSold.productId) { 
      productId.push(false);
    }
  });

  if (productId.some((item) => item === false)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  return next();
};
