const { sequelize, DataTypes } = require('./model.js');
const Note = require('./note.js')
const Category = sequelize.define('Category', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

// Category.hasMany(Note, { foreignKey: 'category_id' });

module.exports = Category;
