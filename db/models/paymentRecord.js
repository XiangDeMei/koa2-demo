module.exports = (sequelize, DataTypes) => {
  const PaymentRecord = sequelize.define('PaymentRecord', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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
  });
  return PaymentRecord;
};
