const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies["x-access-token"];
    if (!token || token === undefined) {
      return next();
    }
    const user = await prisma.user.findUnique({
      where: {
        id: Number(token),
      },
    });
    if (!user) return next();
    req.user = user;
    next();
  } catch (error) {
    console.log(`module.exports= ~ error:`, error);
    next();
  }
};
