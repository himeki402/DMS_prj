import express from 'express'
import categoryController from '../controllers/categoryController.js'

const router = express.Router();

//ADD A category
router.post("/store",categoryController.store)
//Create A category
router.get('/create',categoryController.createCategory)

//Show category
router.get("/",categoryController.showCategory)

//Edit a category

router.get("/:id/getUpdate",categoryController.getUpdate)

//PUT A category
router.put("/:id",categoryController.update)
//Delete a category
router.delete("/:id",categoryController.delete)


export default router