const { Op } = require('sequelize');

const db = require('../models');
const { Order, detail_order } = require('../models');

module.exports = {
  insertOrder: async (req, res) => {
    const { authInfo, body } = req;
    let transaction;
    try {
      const sequelize = db.sequelize;
      transaction = await sequelize.transaction();

      const order = await Order.create(
        {
          userId: authInfo.userId,
          total: body.products.length,
        },
        { transaction }
      );
      const orderId = order.id;

      const detailOrderData = body.products.map((product) => ({
        orderId,
        productName: product.name,
        productPrice: product.price,
        qty: product.qty,
      }));

      await detail_order.bulkCreate(detailOrderData, { transaction });

      await transaction.commit();

      const resultDetails = await Order.findByPk(orderId, {
        attributes: ['id', 'userId', 'total'],
        include: {
          model: detail_order,
          as: 'detail_orders',
          attributes: ['id', 'orderId', 'productName', 'productPrice', 'qty'],
        },
      });

      res.status(200).json({
        status: 200,
        msg: 'Succesfully created order',
        data: resultDetails,
      });
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      res.status(500).json({
        status: 500,
        msg: 'Internal Server Error',
      });
    }
  },
  getAll: async (req, res) => {
    try {
      let order = ['id', 'ASC'];

      if (req.query.order === 'asc') {
        order = ['id', 'ASC'];
      }

      if (req.query.order === 'desc') {
        order = ['id', 'DESC'];
      }

      const search = req.query.search || '';
      const limit = parseInt(req.query.limit) || 5;
      const page = parseInt(req.query.page) || 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const orders = await Order.findAll({
        attributes: ['id', 'total'],
        where: {
          userId: req.authInfo.userId,
        },
        include: {
          model: detail_order,
          as: 'detail_orders',
          attributes: ['id', 'orderId', 'productName', 'productPrice', 'qty'],
          where: {
            productName: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
        order: [order],
        offset,
        limit,
      });

      res.status(200).json({
        status: 200,
        data: orders,
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
