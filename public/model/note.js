const { sequelize, DataTypes } = require('./model.js');
const Category = require('./category.js')
const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
Note.belongsTo(Category, { foreignKey: 'category_id' });


module.exports = Note;
