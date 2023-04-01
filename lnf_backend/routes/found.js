var express = require("express");
const FoundController = require("../controllers/FoundController");

var router = express.Router();

router.get("/", FoundController.AllItems);
router.post("/post", FoundController.PostItem);
router.delete("/:id", FoundController.RemoveItem);
router.put("/:id", FoundController.UpdateItem);

module.exports = router;
