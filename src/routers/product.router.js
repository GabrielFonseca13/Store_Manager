const express = require('express');
const { productController } = require('../controllers');
const validateNameProduct = require('../middlewares/validateNameProduct');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.getProduct);

router.post('/',
  validateNameProduct,
  productController.createProduct);

module.exports = router;