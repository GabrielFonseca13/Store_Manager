const express = require('express');
const { productController } = require('../controllers');
const validateHasNameProduct = require('../middlewares/validateHasNameProduct');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.getProduct);

router.post('/',
  validateHasNameProduct,
  productController.createProduct);

router.put('/:id',
  validateHasNameProduct,
  productController.updatedProduct);

module.exports = router;