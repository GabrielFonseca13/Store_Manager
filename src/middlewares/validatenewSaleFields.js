module.exports = (req, res, next) => {
  const ItemsSold = req.body;

  ItemsSold.forEach((itemSold) => {
  if (!itemSold.productId) return res.status(400).json({ message: '"productId" is required' });

  if (!itemSold.quantity && itemSold.quantity !== 0) return res.status(400).json({ message: '"quantity" is required' });
  });

  return next();
};