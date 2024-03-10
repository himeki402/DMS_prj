import express from 'express'
import documentController from '../controllers/documentController.js'
import upload from '../config/multer.js'
import {isAdmin} from '../middleware/userAuthen.js'

const router = express.Router();


//ADD A Document
router.post("/store", upload.single('file'),documentController.store)
//UPLOAD A document
router.get('/upload',isAdmin,documentController.getUpload)

//DOCUMENT DETAIL
router.get("/:slug",documentController.getDocumentDetail)
//Edit a document

router.get("/:id/edit",isAdmin,documentController.edit)

//PUT A DOCUMENT
router.put("/:id",documentController.update)
//Delete a document
router.delete("/:id",documentController.delete)
//Force delete
router.delete("/:id/force",documentController.forceDelete)
//Restore A DOCUMENT
router.patch("/:id/restore",documentController.restore)


export default router