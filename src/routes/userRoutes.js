const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router;

router.post("/", UserController.createUser);
router.get("/", UserController.listUsers);
router.get("/:id", UserController.findById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = Router;