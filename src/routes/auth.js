import express  from "express";
import authController from "../controllers/authController.js"

const router = express.Router();


//SHOW REGISTER FROM
router.get("/register",authController.getRegister)

//SHOW LOGIN FORM
router.get("/login", authController.getLogin)

//POST REGISTER
router.post("/register", authController.registerUser)

//POST LOGIN
router.post("/login", authController.loginUser)

//LOGOUT
router.get("/logout", authController.logoutUser)


export default router
