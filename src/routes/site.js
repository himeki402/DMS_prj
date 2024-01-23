import  express  from "express"
import  siteController from "../controllers/siteController.js"

const router = express.Router()

//RENDER 
router.get("/", siteController.getHomepage)

export default router