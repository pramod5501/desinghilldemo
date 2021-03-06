// Define Router 
// Created By Pramod Kumar
const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');


router.get('/getall', product_controller.product_getAll);
router.get('/readdata', product_controller.product_readData);
router.post('/getcartitems', product_controller.product_getcartitems);

router.post('/addtocart', product_controller.product_addtocart);

module.exports = router;