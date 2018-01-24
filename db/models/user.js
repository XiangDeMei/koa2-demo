const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      set(createdAt) {
        this.setDataValue('createdAt', moment(createdAt).format('YYYY-MM-DD HH:mm:ss Z'));
      },
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss Z');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      set(updatedAt) {
        this.setDataValue('updatedAt', moment(updatedAt).format('YYYY-MM-DD HH:mm:ss Z'));
      },
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss Z');
      },
    },
  });
  return User;
};
