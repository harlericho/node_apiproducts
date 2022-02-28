const express = require('express');
const router =  express.Router();
const product = require('../controllers/product');


// todo: Routers for products
router.get('/', product.getAllProducts);
router.get('/:id', product.getProductById);
router.post('/', product.postProduct);
router.put('/:id', product.putProductById);
router.delete('/:id', product.deleteProductById);






// * Export the router
module.exports = router;