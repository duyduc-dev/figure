const { PrismaClient } = require("@prisma/client");

const products = require("../data/product");
const { getRandomItems } = require("../utils/helper");

const prisma = new PrismaClient();

class HomeController {
  home(req, res) {
    const trendingProducts = getRandomItems(products, 4);
    const mostProduct = getRandomItems(products, 6);
    const topCategory = getRandomItems(products, 5);

    return res.render("index", {
      type: "home",
      user: req.user,
      trendingProducts,
      mostProduct,
      topCategory,
    });
  }

  shop(req, res) {
    return res.render("shop", { type: "shop", user: req.user, products });
  }

  productDetail(req, res) {
    const id = Number(req.query.id) || 0;
    const currentProduct = products.find((item) => item.id === id);
    const relateProduct = products.filter(
      (item) =>
        item.id !== currentProduct.id &&
        item.category === currentProduct.category
    );

    return res.render("product-detail", {
      type: "product-detail",
      user: req.user,
      product: currentProduct,
      stringProd: JSON.stringify(currentProduct),
      relateProduct,
    });
  }

  contact(req, res) {
    return res.render("contact", {
      type: "contact",
      user: req.user,
    });
  }

  register(_, res) {
    return res.render("register", { layout: "./layout/EmptyLayout" });
  }

  async registerUser(req, res) {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
      },
    });
    console.log(`HomeController ~ registerUser ~ user:`, user);
    return res
      .cookie("x-access-token", user.id, {
        expires: new Date(Date.now() + 1000 * 60 * 5),
        httpOnly: true,
      })
      .redirect("/");
  }

  async loginUser(req, res) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    if (!user) {
      return res.redirect("/");
    }

    return res
      .cookie("x-access-token", user.id, {
        expires: new Date(Date.now() + 1000 * 60 * 5),
        httpOnly: true,
      })
      .redirect("/");
  }

  logout(_, res) {
    res.clearCookie("x-access-token");
    return res.redirect("/");
  }

  cart(req, res) {
    res.render("card", { type: "cart", user: req.user, products });
  }
}

module.exports = HomeController;
