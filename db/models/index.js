const sequelize = require('./db');

const User = sequelize.import('./user.js');
const Merchant = sequelize.import('./merchant.js');
const PaymentRecord = sequelize.import('./paymentRecord.js');

Merchant.hasMany(PaymentRecord);
PaymentRecord.belongsTo(Merchant);

// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });
sequelize.sync();

module.exports = {
  User,
  Merchant,
  PaymentRecord,
};
