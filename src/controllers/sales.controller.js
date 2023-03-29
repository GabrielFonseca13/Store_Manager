const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertNewSale = async (req, res) => {
  const salesProducts = req.body;
  const { type, message } = await salesService.newSalePost(salesProducts);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const getAllDetailedSales = async (_req, res) => {
  const { message } = await salesService.getAllDetailedSales();

  return res.status(200).json(message);
};

const getDetailedSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getDetailedSalesById(id);
 
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  insertNewSale,
  getAllDetailedSales,
  getDetailedSalesById,
};