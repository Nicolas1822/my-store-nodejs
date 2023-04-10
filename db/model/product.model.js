const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model.js');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },

  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    //Indica la tabla a la cual se va a relacionar
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
