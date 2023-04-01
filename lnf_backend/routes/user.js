var express = require("express");
const UserController = require("../controllers/UserController");

var router = express.Router();

router.get("/", UserController.AllUser);
router.put("/:id", UserController.UpdateUser);
router.delete("/:id", UserController.RemoveUser);

module.exports = router;
