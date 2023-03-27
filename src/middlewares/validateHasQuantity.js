module.exports = (req, res, next) => {
  const itemsSold = req.body;
  const quantity = [];
  
  itemsSold.forEach((itemSold) => {
    if (!itemSold.quantity && itemSold.quantity !== 0) {
      quantity.push(false);
    }
  });

  if (quantity.some((item) => item === false)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  return next();
};
