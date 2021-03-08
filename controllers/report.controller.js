/*  Created By : Pramod kumar
report calss
*/
var product_data = require('../models').product_data;
const user_cart = require('../models').user_cart;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.report_getAll=function(req,res,next)
{
    product_data.findAll({where:{'$user_carts.id$':{[Op.not]:null}},include:[{model:user_cart,attributes:
            [
                [Sequelize.fn('count', Sequelize.col('id')), 'total_user'],
                [Sequelize.fn('sum', Sequelize.col('quantity')), 'total_quantity']
            ]
        }],group : ['product_data.product_id'],raw: true}).then(async result => {
       
            res.json(result);
      
    }).catch((error)=>{
        return next(error);
    });
}

