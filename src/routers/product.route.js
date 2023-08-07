const { Router } = require("express");

const productController = require("../controllers/product.controller");
const checkAuth = require("../middlewares/auth");

const productRouter = Router();

productRouter.get("/", checkAuth.isSignedIn, productController.getAll);

module.exports = productRouter;