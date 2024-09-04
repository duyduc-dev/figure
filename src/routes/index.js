const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");

const homeController = new HomeController();

/* GET home page. */
router.get("/", authMiddleware, homeController.home);
router.get("/shop", authMiddleware, homeController.shop);
router.get("/product-detail", authMiddleware, homeController.productDetail);
router.get("/contact", authMiddleware, homeController.contact);
router.get("/cart", authMiddleware, homeController.cart);
router.get("/register", homeController.register);
router.post("/register", homeController.registerUser);
router.post("/login", homeController.loginUser);
router.get("/logout", homeController.logout);

module.exports = router;
