const { Router } = require("express");

const welcomeRouter = require("./welcome.route");
const authRouter = require("./auth.route");
const productRouter = require("./product.route");
const orderRouter = require("./order.route");

const mainRouter = Router();

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/order", orderRouter);

module.exports = mainRouter;