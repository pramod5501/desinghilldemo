module.exports = function(sequelize, Sequelize) {
    var ProductSchema = sequelize.define('product_data', {
        product_id:{type:Sequelize.INTEGER,
                    primaryKey:true
                    },
        product_name: Sequelize.STRING,
        sku_code: Sequelize.STRING,
        price: Sequelize.FLOAT
    },{
        timestamps: false
    });
    return ProductSchema;
}