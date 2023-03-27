module.exports = (req, res, next) => {
  const itemsSold = req.body;
  
  const invalidItem = itemsSold.find((item) => item.quantity <= 0);
  if (invalidItem) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  return next();
};
