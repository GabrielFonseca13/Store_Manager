const express = require('express');
const { productController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.getProduct);

router.post('/',
  validateNewProduct,
  productController.createProduct);

module.exports = router;