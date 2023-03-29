const express = require('express');
const { salesController } = require('../controllers');
const validateHasProductId = require('../middlewares/validateHasProductId');
const validateHasQuantity = require('../middlewares/validateHasQuantity');
const validateQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.post('/',
  validateHasProductId,
  validateHasQuantity,
  validateQuantity,
  salesController.insertNewSale);

router.get('/', salesController.getAllDetailedSales);

router.get('/:id', salesController.getDetailedSalesById);

module.exports = router;