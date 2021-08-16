const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUp
  );

  app.post("/api/auth/signin", controller.signin);
};
