//const Product = require('../models/product');
var product_data = require('../models').product_data;
const user_cart = require('../models').user_cart;
const Sequelize = require('sequelize');
const fs = require('fs');


exports.product_getAll =  function (req, res,next) {

    let limit = 2
    let offset=0;
    console.log(req.body.limit);
    if(req.body.limit != undefined)
    {
        limit = parseInt(req.body.limit);
    }
    if(req.body.page != undefined)
    {
         offset = 0 + (req.body.page - 1) * limit
    }

     const productData = product_data.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [
                ['product_name', 'ASC']
            ]
        }).then(async result => {
             response=
            {
                status: true,
                message:'success',
                innerData: result
            };
            res.json(response);
        })
        .catch(err => {
          
          return next(err);
        })
        console.log(productData);
  // res.json(productData);
};

// read data from file
exports.product_readData =  function (req, res,next) {
    console.log(`dir name ${__dirname}`);
    const uploadPath = '/var/www/html/designhill/public/uploads/';
    fs.readFile(uploadPath+"/products-06.json",(err,data)=>{
        if(err) throw err;
        const products = JSON.parse(data);
        // save into db
        products.forEach(element => {
            console.log(element.productName);
            product_data.create({ 
                product_id: element.productId,
                product_name: element.productName,
                sku_code: element.skuCode, 
                price: element.price 
            }).then(product => {
                console.log(product.get({
                  plain: true
                }));
                res.send(product);
            }).catch((error) => {
                console.log(error);
                let response={
                    status:true,
                    msg:"Already Imported",
                }
                res.json(response);
                

              });
              
        });
        //console.log(products);
    })
}

// add to cart
exports.product_addtocart =  function (req, res,next) {
    const {user_id,product_id,quantity} = req.body;
    let response={};
    if(isNaN(quantity) || quantity== 0)
    {
        response={
            status:'error',
            msg:"Enter valid number",

        }
        res.json(response);
        return
    }
    // check 
    if(isNaN(user_id) || isNaN(product_id))
    {
        response={
            status:'error',
            msg:"Enter valid data",

        }
        res.json(response);
        return
    }
    // get product
    product_data.findOne({where:{product_id:product_id}}).then(product=>{
       
        // check item into cart
        user_cart.findOne({where:{user_id:user_id,product_id:product_id}}).then(items=>{
            if(items)
            {
                // update
                let preqty = items.quantity;
                let newquantity = parseInt(quantity) + parseInt(preqty);
                user_cart.update({ 
                   quantity: newquantity,             
                },{where:{user_id: user_id,
                    product_id: product_id}}).then(result => {
                        res.status(200).json(result);
                    });
            }else{
                // create
                // add to cart
        user_cart.create({ 
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,             
        }).then(cart => {
            console.log(cart.get({
              plain: true
            }));
            res.send(cart);
        }).catch((error) => {
            console.log(error);
            let response={
                status:true,
                msg:"Error in add items",
            }
            res.json(response);
            

          });
            }

        }).catch((error)=>{
            console.log(error);
        })
        
        
    }).catch((error)=>{

        let response={
            status:true,
            msg:"Already Imported",
        }
        res.json(response);
        return;
    })



}
// list of cart items

exports.product_getcartitems =  function (req, res,next) {

   
   
    let userId = req.body.userId;
   
     user_cart.findAll({where:{user_id:userId},include:[{model:product_data,attributes:['product_name','price','sku_code']}]}).then(async result => {
        var resData={};
         resData['data']=[];
        
        let subTotal=0;
        let granTotal=0
      
        result.forEach(element=>{
            //console.log(element.product_datum.product_data);
           // console.log(element.product_datum.product_name);
           var response={};
            response['product_id']=element.product_id;
            response['productName']= element.product_datum.product_name;
            response['sku']= element.product_datum.sku_code;
            response['price']=element.product_datum.price;
            response['quantity']=element.quantity;
            //console.log(response);
            resData['data'].push(response);
            subTotal+= parseFloat(element.product_datum.price);
            granTotal = subTotal;
            //return resData;

        })
        resData['grandTotal'] = granTotal;
        resData['subTotal']=subTotal;
        //response['subTotal'] = subTotal;
        //response['granTotal'] = granTotal;

        console.log(resData);
        
        finalresponse=
            {
                status: true,
                message:'success',
                innerData: resData
            };
            res.json(finalresponse);
        })
        .catch(err => {
          
          return next(err);
        })
       // console.log(user_cart);
  // res.json(productData);
};


