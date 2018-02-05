const { Op } = require('sequelize');
const { Merchant, PaymentRecord } = require('../../db/models');
const io = require('../socket');
const rds = require('../../config/redis');

/* eslint camelcase: */
/* eslint prefer-const: */

async function index(ctx) {
  await rds.smembers('qwqe', (err, members) => {
    members.forEach((id) => {
      if (io.sockets.connected[id] === undefined) {
        rds.srem('qwqe', id);
      } else {
        io.sockets.connected[id].emit('chat message', '回复');
      }
    });
  });
  let { page, page_size, endTime, ...queryParams } = ctx.query;
  page = Number(page);
  page_size = Number(page_size);
  if (endTime) {
    queryParams.endTime = { [Op.lte]: endTime };
  }
  const { count, rows } = await Merchant.findAndCountAll({
    offset: (page - 1) * page_size || 0,
    limit: page_size || 10,
    order: [['createdAt', 'DESC']],
    where: {
      ...queryParams,
    },
  });
  ctx.body = {
    merchants: rows,
    count,
  };
}

async function create(ctx) {
  const { merchant } = ctx.request.body;
  const merchantExist = await Merchant.findOne({
    where: {
      agencyId: merchant.agencyId,
      type: merchant.type,
    },
  });
  if (!merchantExist) {
    await Merchant.create(merchant);
  } else {
    ctx.throw(400, '商户已开通该服务');
  }
}

async function read(ctx) {
  const { id } = ctx.params;
  const merchant = await Merchant.findById(id);
  if (merchant) {
    ctx.response.body = {
      status: 'success',
      merchant,
    };
  } else {
    ctx.throw(404);
  }
}

async function readRecords(ctx) {
  const { id } = ctx.params;
  let { page, page_size } = ctx.query;
  page = Number(page);
  page_size = Number(page_size);
  const { count, rows } = await PaymentRecord.findAndCountAll({
    where: { MerchantId: id },
    offset: (page - 1) * page_size || 0,
    limit: page_size || 10,
    order: [['createdAt', 'DESC']],
  });
  if (rows) {
    ctx.body = {
      records: rows,
      count,
    };
  }
}

async function reNew(ctx) {
  const { id } = ctx.params;
  const { payment_record } = ctx.request.body;
  const merchant = await Merchant.findById(id);
  if (!merchant) {
    ctx.throw(400, '该商户不存在');
    return;
  }
  const record = await PaymentRecord.create({ ...payment_record });
  await record.setMerchant(merchant);
  await merchant.update({ endTime: payment_record.endTime });
  if (record) {
    ctx.body = {
      payment_record: record,
    };
  }
}

module.exports = {
  index,
  create,
  read,
  reNew,
  readRecords,
};
