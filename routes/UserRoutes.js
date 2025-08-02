const express = require("express");
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/UserControlles");
const router = express.Router();

const SECRET = process.env.JWT_SECRET;


// Core User APIs
router.get('/', UserController.getalluser);
router.post('/signup', UserController.Signup);
router.post('/login', UserController.login);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);
router.post("/logout", UserController.logoutUser);




module.exports = router;
