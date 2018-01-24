const moment = require('moment');

moment.locale('zh_cn');

module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define('Merchant', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    agencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstTime: {
      type: DataTypes.DATE,
      allowNull: false,
      set(firstTime) {
        this.setDataValue('firstTime', moment(firstTime).format('YYYY-MM-DD HH:mm:ss Z'));
      },
      get() {
        return moment(this.getDataValue('firstTime')).format('YYYY-MM-DD HH:mm:ss Z');
      },
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      set(endTime) {
        this.setDataValue('endTime', moment(endTime).format('YYYY-MM-DD HH:mm:ss Z'));
      },
      get() {
        return moment(this.getDataValue('firstTime')).format('YYYY-MM-DD HH:mm:ss Z');
      },
    },
    type: {
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
  return Merchant;
};
