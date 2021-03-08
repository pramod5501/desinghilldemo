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

    ProductSchema.associate=function(models){
        ProductSchema.hasMany(models.user_cart,{ sourceKey: 'product_id', foreignKey: 'product_id' });
    }
    return ProductSchema;
}