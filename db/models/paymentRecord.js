const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const PaymentRecord = sequelize.define('PaymentRecord', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    operatorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING,
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
  return PaymentRecord;
};
