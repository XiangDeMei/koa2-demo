const { Merchant, PaymentRecord } = require('../../db/models');

/* eslint camelcase: */

async function index(ctx) {
  const { page, page_size } = ctx.request.search;
  try {
    const merchants = await Merchant.findAll({
      offset: (page - 1) * page_size || 0,
      limit: page_size || 10,
    });
    ctx.response.body = {
      merchants,
    };
  } catch (error) {
    ctx.throw(500);
  }
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
  try {
    const records = await PaymentRecord.findAndCountAll({
      where: { MerchantId: id },
      order: [['createdAt', 'DESC']],
    });
    if (records) {
      ctx.body = {
        records,
      };
    }
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
}

async function reNew(ctx) {
  const { id } = ctx.params;
  const { payment_record } = ctx.request.body;
  try {
    const merchant = await Merchant.findById(id);
    if (!merchant) {
      ctx.throw(400, '该商户不存在');
    }
    const record = await PaymentRecord.create({ ...payment_record });
    record.setMerchant(merchant);
    if (record) {
      ctx.body = {
        message: '创建成功',
        payment_record: record,
      };
    }
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
}

module.exports = {
  index,
  create,
  read,
  reNew,
  readRecords,
};
