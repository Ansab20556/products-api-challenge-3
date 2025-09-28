const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productsController');
const validateProduct = require('../middleware/validateProduct');

// list
router.get('/', ctrl.getAllProducts);

// single
router.get('/:id', ctrl.getSingleProduct);

// create
router.post('/', validateProduct, ctrl.createProduct);

// update
router.put('/:id', validateProduct, ctrl.updateProduct);

// delete
router.delete('/:id', ctrl.deleteProduct);

module.exports = router;
