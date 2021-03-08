// Define Router 
// Created By Pramod Kumar
const express = require('express');
const router = express.Router();
const user_cart = require('../models').user_cart;
const Sequelize = require('sequelize');
const product_controller = require('../controllers/product.controller');


router.get('/getall', product_controller.product_getAll);
router.get('/readdata', product_controller.product_readData);
router.post('/getcartitems', product_controller.product_getcartitems);

router.post('/addtocart', product_controller.product_addtocart);
router.delete('/:id/delete', function(req,res){
    console.log(`Delete ID== ${req.params.id}`);
    // check item into cart
    user_cart.findOne({where:{id:req.params.id}}).then(items=>{
        if(items)
        {
            user_cart.destroy({ 
                where: {id:req.params.id} 
            }).then(result => {
                response={status:'success',msg:'Cart item removed'};
                res.status(200).json(response);
            });
        }else{
            response={
                status:'error',
                msg:"Enter valid data",      
            }
            res.json(response);

        }
       
        return
    }).catch((error)=>{
        console.log(error);

    });
});;

module.exports = router;