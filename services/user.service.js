const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize.js');

class UserService {
  constructor() {
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    let newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    delete newUser.dataValues.recoveryToken;
    return newUser;
  }

  async find() {
    let findUser = await models.User.findAll({
      include: ['customer']
    });

    return findUser;
  }

  async findByEmail(email) {
    let response = await models.User.findOne({
      where: { email }
    });
    return response;
  }

  async findOne(id) {
    let user = await models.User.findByPk(id, {
      include: 'customer'
    });
    if (!user) {
      throw boom.notFound('User not found, sorry!!');
    }
    delete user.dataValues.password
    delete user.dataValues.recoveryToken;
    return user;
  }

  async update(id, changes) {
    let user = await this.findOne(id);
    let response = await user.update(changes);
    delete response.dataValues.password;
    delete response.dataValues.recoveryToken;
    return response;
  }

  async delete(id) {
    let user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
