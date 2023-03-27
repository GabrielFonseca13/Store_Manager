const express = require('express');
const { salesController } = require('../controllers');
const validatenewSaleFields = require('../middlewares/validatenewSaleFields');
// const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.post('/',
  validatenewSaleFields,
  salesController.insertNewSale);

module.exports = router;