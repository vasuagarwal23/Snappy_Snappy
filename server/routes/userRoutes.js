// userRoutes.js
const router = require("express").Router();
const { register, login } = require("../controllers/userControllers"); // Adjust the path as needed

router.post("/register", register);
router.post("/login", login);
module.exports = router;
