const { Merchant, PaymentRecord } = require('../../db/models');

/* eslint camelcase: */

async function index(ctx) {
  let { page, page_size } = ctx.query;
  page = Number(page);
  page_size = Number(page_size);
  const { count, rows } = await Merchant.findAndCountAll({
    offset: (page - 1) * page_size || 0,
    limit: page_size || 10,
    order: [['createdAt', 'DESC']],
  });
  ctx.body = {
    status: 'success',
    merchants: rows,
    count,
  };
}

async function create(ctx) {
  const { merchant } = ctx.request.body;
  await Merchant.create({ ...merchant }).then((res) => {
    ctx.response.body = res;
  }).catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      ctx.throw(400, '机构号不能重复。');
    }
  });
}

async function read(ctx) {
  const { id } = ctx.params;
  try {
    const merchant = await Merchant.findById(id);
    if (merchant) {
      ctx.response.body = {
        status: 'success',
        merchant,
      };
    } else {
      ctx.throw(404);
    }
  } catch (error) {
    ctx.throw(500);
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
  }
  const record = await PaymentRecord.create({ ...payment_record });
  await record.setMerchant(merchant);
  await merchant.update({ endTime: payment_record.endTime });
  if (record) {
    ctx.body = {
      status: 'success',
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
