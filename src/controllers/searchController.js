import { Document, Category } from "../model/model.js"
import { mutlpleMongooseToObject } from "../util/mongoose.js"

const searchController = {
  search: async (req, res) => {
    try {
      const { searchTerm } = req.body;
      const categories = await Category.find();
      const searchResults = await Document.find({
        $or: [
          { name: { $regex: new RegExp(searchTerm, 'i') } },
          { data: { $regex: new RegExp(searchTerm, 'i') } },
        ],
      }).populate('category');

      res.render('search/searchView', {
        results: mutlpleMongooseToObject(searchResults),
        categories: mutlpleMongooseToObject(categories),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Lỗi khi thực hiện tìm kiếm');
    }
  }
}

export default searchController