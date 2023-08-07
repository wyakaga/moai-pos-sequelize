const { Op } = require('sequelize');

const { Product } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    try {
      let order = ['id', 'ASC'];

      if (req.query.order === 'asc') {
        order = ['productName', 'ASC'];
      }

      if (req.query.order === 'desc') {
        order = ['productName', 'DESC'];
      }

      const search = req.query.search || '';
      const limit = parseInt(req.query.limit) || 5;
      const page = parseInt(req.query.page) || 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const products = await Product.findAll({
        attributes: ['id', 'productName', 'productPrice', 'picture'],
        where: {
          productName: {
            [Op.iLike]: `%${search}%`,
          },
        },
        order: [order],
        offset,
        limit,
      });

      res.status(200).json({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        msg: 'Internal Server Error',
      });
    }
  },
};
