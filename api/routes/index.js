const express = require("express");
const router = express.Router();
const users = require("./user.routes");
const auth = require("./auth.routes");

router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
