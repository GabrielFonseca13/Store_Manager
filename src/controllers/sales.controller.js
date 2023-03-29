const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertNewSale = async (req, res) => {
  const salesProducts = req.body;
  const { type, message } = await salesService.newSalePost(salesProducts);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

// const listSales = async (_req, res) => {
//   const { message } = await salesService.findAll();

//   // if (type) return res.status(errorMap.mapError(type)).json(message);

//   return res.status(200).json(message);
// };

// const getSaleById = async (req, res) => {
//   const { id } = req.params;
//   const { type, message } = await salesService.findById(id);

//   if (type) return res.status(errorMap.mapError(type)).json({ message });

//   return res.status(200).json(message);
// };

module.exports = {
  insertNewSale,
  // listSales,
  // getSaleById,
};