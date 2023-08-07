const { Router } = require("express");

const orderController = require("../controllers/order.controller");
const checkToken = require("../middlewares/auth");

const orderRouter = Router();

orderRouter.post("/", checkToken.isSignedIn, orderController.insertOrder);
orderRouter.get("/", checkToken.isSignedIn, orderController.getAll);

module.exports = orderRouter;