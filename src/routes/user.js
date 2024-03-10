import express  from "express";
import UserController from "../controllers/userController.js"
import {isAdmin} from '../middleware/userAuthen.js'

const router = express.Router();

//Show user profile 
router.get("/profile", UserController.showUserprofile)

//Show user documents
router.get("/documents",isAdmin, UserController.showUserdocuments)

//Put user profile
router.put("/:id", UserController.updateUserProfile)

//Show bin
router.get("/bin",isAdmin, UserController.bin)

export default router
