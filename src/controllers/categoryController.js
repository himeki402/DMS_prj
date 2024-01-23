import { Category } from "../model/model.js";
import { mutlpleMongooseToObject } from "../util/mongoose.js"
import {mongooseToObject} from "../util/mongoose.js"

const categoryController = {
    showCategory: async (req, res) => {
        try {
            Category.find({})
                .then(Categories => {
                    res.render('category/show', {
                        Categories: mutlpleMongooseToObject(Categories),
                    },)
                })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createCategory: async(req, res) => {
        try {
            res.render('category/create')
        } catch (error) {
            res.status(500).json(error)
        }
    },
    store: async(req,res)=>{
        const newCategory = await new Category(req.body)
        newCategory.save()
        res.redirect("/category")
    },    
    //Get /category/:id/getUpdate
    getUpdate: async(req,res)=>{
        try {
            Category.findById(req.params.id)
            .then(Category => res.render('category/update',{
                Category:mongooseToObject(Category),
            }))

        } catch (error) {
            res.status(500).json(error)
        }
    },
    //PUT /category/:id/
    update: async(req,res)=>{
        Category.updateOne({_id:req.params.id},req.body)
        .then(()=>res.redirect('/category'));
    },
    //DELETE /category/:id/
    delete: async(req,res)=>{
        try {
            Category.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'));
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
}

export default categoryController