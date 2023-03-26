const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertNewSale = async (req, res) => {
  const salesProducts = req.body;
  const { type, message } = await salesService.newSalePost(salesProducts);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  insertNewSale,
};