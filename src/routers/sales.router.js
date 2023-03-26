const express = require('express');
const { salesController } = require('../controllers');
// const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.post('/', salesController.insertNewSale);

module.exports = router;