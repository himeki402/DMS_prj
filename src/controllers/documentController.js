import { Document, Category } from "../model/model.js"
import { mongooseToObject, mutlpleMongooseToObject } from "../util/mongoose.js"
import { readPDF } from '../config/readPDF.js';

const documentController = {
    getDocumentDetail: async (req, res) => {
        try {
            const slug = req.params.slug;
            const selectedDocument = await Document.findOne({ slug }).populate('category');

            if (!selectedDocument) {
                return res.status(404).send('Không tìm thấy tài liệu.');
            }
            const category = selectedDocument.category;
            const relatedDocuments = await Document.find({ category }).limit(5);

            res.render("document/show", {
                document: mongooseToObject(selectedDocument),
                relatedDocuments: mutlpleMongooseToObject(relatedDocuments),
            })

        } catch (error) {
            res.send("Không tìm được file văn bản")
            console.log(error)
        }
    },
    getUpload: async (req, res) => {
        try {
            const categories = await Category.find();
            res.render('document/upload', {
                categories: mutlpleMongooseToObject(categories)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    store: async (req, res) => {
        const { name, description, category, tags } = req.body;
        const filePath = req.file.path;
        const fileName = req.file.filename;
        const pdfData = await readPDF(filePath)

        const newDocument = new Document({
            name, description, category, filePath, tags, fileName,
            data: pdfData, createdBy: req.user
        });
        await newDocument.save();

        res.redirect("/")
    },
    //Get /Documents/:id/edit
    edit: async (req, res) => {
        try {
            const categories = await Category.find();
            Document.findById(req.params.id)
                .then(document => res.render('document/edit', {
                    document: mongooseToObject(document),
                    categories: mutlpleMongooseToObject(categories)

                }))

        } catch (error) {
            res.status(500).json(error)
        }
    },
    //PUT /documents/:id/
    update: async (req, res) => {
        Document.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user/documents'));
    },
    //DELETE /documents/:id/
    delete: async (req, res) => {
        try {
            Document.delete({ _id: req.params.id })
                .then(() => res.redirect('back'));
        } catch (error) {
            res.status(500).json(error)
        }

    },
    //FORCE DELETE /documents/:id/force
    forceDelete: async (req, res) => {
        try {
            Document.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('back'));
        } catch (error) {
            res.status(500).json(error)
        }

    },
    //PATCH /documents/:id/restore
    restore: async (req, res) => {
        try {
            Document.restore({ _id: req.params.id })
                .then(() => res.redirect('back'));
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


export default documentController

