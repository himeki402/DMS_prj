import { User } from "../model/model.js"
import { Document, Category } from "../model/model.js"
import { mutlpleMongooseToObject } from "../util/mongoose.js"
import { mongooseToObject } from "../util/mongoose.js"

const userController = {
    showUserprofile: async (req, res) => {
        try {
            res.render('User/userProfile', {
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //Get all documents
    showUserdocuments: async (req, res) => {
        const page = parseInt(req.query.page) || 1; 
        const perPage = 8;
        try {
            const documents = await Document.paginate({}, { page, limit: perPage, populate: 'category' });
            const categories = await Category.find();
            const paginationInfo = {
                totalDocs: documents.totalDocs,
                limit: documents.limit,
                totalPages: documents.totalPages,
                page: documents.page,
                pagingCounter: documents.pagingCounter,
                hasPrevPage: documents.hasPrevPage,
                hasNextPage: documents.hasNextPage,
                prevPage: documents.prevPage,
                nextPage: documents.nextPage
            };
            res.render('User/userDocuments', {
                documents: mutlpleMongooseToObject(documents.docs),
                paginationInfo: paginationInfo,
                categories: mutlpleMongooseToObject(categories),
                
            }
            )
            
        } catch (error) {
            console.error(error)
        }
    },
    updateUserProfile: async (req, res) => {
        try {
            User.updateOne({ _id: req.params.id }, req.body)
                .then(() =>
                    res.redirect('/user/profile'
                    ));

        } catch (error) {
            console.log(error);
        }
    },
    //Get user/bin
    bin: async (req, res) => {
        try {
            const deletedDocuments = await Document.findDeleted().populate('category')
            const categories = await Category.find();
            console.log("22", deletedDocuments)
            res.render('User/userBin', {
                deletedDocuments: mutlpleMongooseToObject(deletedDocuments),
                categories: mutlpleMongooseToObject(categories)
            })
        } catch (error) {
            console.error('Error in bin route:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default userController

