const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() { }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id, {
      include: ['user']
    });
    if (!user) {
      throw boom.notFound('customer not found');
    }
    delete user.user.dataValues.password;
    delete user.user.dataValues.recoveryToken;
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.user.dataValues.password;
    delete newCustomer.user.dataValues.recoveryToken;
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    delete rta.user.dataValues.password;
    delete rta.user.dataValues.recoveryToken;
    return rta;
  }

  async delete(id) {
    const deleteCustomer = await this.findOne(id);
    await deleteCustomer.destroy({
      include: ['user']
    });
    return { rta: true };
  }

}

module.exports = CustomerService;
