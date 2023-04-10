const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize.js');

class CategoryService {

  constructor() {
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    let category = await models.Category.findAll({
      include: ['products']
    });
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const findCategory = await this.findOne(id);
    const updateCategory = await findCategory.update(changes);
    return {
      id,
      updateCategory,
    };
  }

  async delete(id) {
    const findCategory = await this.findOne(id);
    const deleteCategory = await findCategory.destroy();
    return { id, deleteCategory };
  }

}

module.exports = CategoryService;
