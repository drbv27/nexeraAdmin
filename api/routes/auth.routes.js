const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { validateAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/me", validateAuth, AuthController.me);
router.post("/login/", AuthController.login);
router.post("/logout/", AuthController.logout);
router.post("/newpass/", AuthController.newPassword);
router.put("/forgot-password/", AuthController.forgotPassword);
router.put("/reset-password/", AuthController.resetPassword);
router.put("/suspendUser/", AuthController.SuspendUser);
router.put("/activeUser/", AuthController.ActiveUser);


module.exports = router;
