const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize.js');

class OrderService {

  constructor() {
  }
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ]
    });
    return orders;
  }

  async find() {
    let orderFind = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: 'user',
        },
        'items'
      ]
    });
    return orderFind;
  }

  async findOne(id) {
    let orderFind = await models.Order.findByPk(id, {
      //Incluye las asociaciones de la tabla que conecta
      include: [
        {
          association: 'customer',
          include: 'user',
        },
        'items'
      ]
    });
    if (!orderFind) {
      throw boom.notFound('order not found');
    }
    delete orderFind.customer.user.dataValues.password;
    delete orderFind.customer.user.dataValues.recoveryToken;
    return orderFind;
  }

  async findOrder(id) {
    const findOrder = await models.Order.findByPk(id);
    if (!findOrder) {
      throw boom.notFound('Order not found');
    }
    return findOrder;
  }

  async update(id, changes) {
    const update = await this.findOrder(id);
    await update.update(changes);
    return update;
  }

  async delete(id) {
    const order = await this.findOrder(id);
    await order.destroy()
    return { message: 'order delete' };
  }

}

module.exports = OrderService;
