const router = require("express").Router();

const cartController = require("./controller");

router.post("/", cartController.addItemToCart);
router.get("/", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);

module.exports = router;