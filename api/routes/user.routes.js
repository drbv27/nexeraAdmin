const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/:type/create", UserController.createUser);
router.get("/:type/all", UserController.getAllUsers);
router.get("/:type/:id", UserController.getUser);
router.put("/:type/update/", UserController.updateUser);
router.delete("/:type/delete/:id", UserController.deleteUser);

module.exports = router;
