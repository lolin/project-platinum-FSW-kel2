'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    shippingAddress: DataTypes.STRING,
    orderStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};