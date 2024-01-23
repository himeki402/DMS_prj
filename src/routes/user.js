import express  from "express";
import UserController from "../controllers/userController.js"

const router = express.Router();

//Show user profile 
router.get("/profile", UserController.showUserprofile)

//Show user documents
router.get("/documents", UserController.showUserdocuments)

//Put user profile
router.put("/:id", UserController.updateUserProfile)

//Show bin
router.get("/bin", UserController.bin)

export default router
