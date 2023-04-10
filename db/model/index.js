const { User, UserShema } = require('./user.model.js');
const { Order, OrderSchema } = require('./order.model.js');
const { Category, CategoryShcema } = require('./category.model.js');
const { Product, ProductSchema } = require('./product.model.js');
const { Customer, CustomerSchema } = require('./customer.model.js');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

const setupModel = (sequelize) => {
  User.init(UserShema, User.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Category.init(CategoryShcema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);//Ejecuta las foreing keys y se deben poner en el ultimo lugar
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
}

module.exports = setupModel;
