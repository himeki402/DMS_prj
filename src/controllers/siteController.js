// Trong file siteController.js
import { Document, Category } from "../model/model.js";
import { mutlpleMongooseToObject } from "../util/mongoose.js";

const siteController = {
    getHomepage: async (req, res) => {
        const page = parseInt(req.query.page) || 1; 
        const perPage = 8;
        const selectedCategoryId = req.query.category;
            const filter = selectedCategoryId ? { category: selectedCategoryId } : {};

        try {
            const documents = await Document.paginate(filter, { page, limit: perPage, populate: 'category' });
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
            res.render('home', {
                documents: mutlpleMongooseToObject(documents.docs),
                paginationInfo: paginationInfo,
                categories: mutlpleMongooseToObject(categories),
                selectedCategoryId: selectedCategoryId,
                isHomePage: true
            });
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu trang chủ:', error);
            res.status(500).send('Lỗi khi lấy dữ liệu trang chủ');
        }
    }
};

export default siteController;
