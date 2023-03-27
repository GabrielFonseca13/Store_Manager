const express = require('express');
const { salesController } = require('../controllers');
const validateHasProductId = require('../middlewares/validateHasProductId');
const validateHasQuantity = require('../middlewares/validateHasQuantity');
// const validatenewSaleFields = require('../middlewares/validatenewSaleFields');
const validateQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.post('/',
  validateHasProductId,
  validateHasQuantity,
  validateQuantity,
  salesController.insertNewSale);

module.exports = router;