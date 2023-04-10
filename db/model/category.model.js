const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategoryShcema = {
  id: {
    allowNull: false,//Si es falso le decimos que no permita nulls es decir un not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategoryShcema, Category }
