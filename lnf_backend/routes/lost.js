var express = require("express");
const LostController = require("../controllers/LostController");

var router = express.Router();

router.get("/", LostController.AllItems);
router.post("/post", LostController.PostItem);
router.put("/:id", LostController.UpdateItem);
router.delete("/:id", LostController.RemoveItem);
module.exports = router;
