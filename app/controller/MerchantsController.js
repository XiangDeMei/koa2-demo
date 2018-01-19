const { Merchant } = require('../../db/models');

/* eslint camelcase: */

async function index(ctx) {
  const { page, page_size } = ctx.request.search;
  const merchants = await Merchant.findAll({
    offset: (page - 1) * page_size || 0,
    limit: page_size,
  });
  ctx.response.body = {
    merchants,
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
  const merchant = await Merchant.findById(id);

  if (merchant) {
    ctx.response.body = {
      merchant,
    };
  } else {
    ctx.throw(404);
  }
}

module.exports = {
  index,
  create,
  read,
};
