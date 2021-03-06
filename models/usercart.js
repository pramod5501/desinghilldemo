module.exports = function(sequelize, Sequelize) {
    var UsercartSchema = sequelize.define('user_cart', {
        product_id:Sequelize.INTEGER,
        user_id:Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,       
    },{
        timestamps: false
    });

    UsercartSchema.associate=function(models){
        UsercartSchema.belongsTo(models.product_data,{foreignKey:'product_id'});
    }
    return UsercartSchema;
}