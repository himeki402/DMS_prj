import mongoose from "mongoose";
import slug from "mongoose-slug-generator"
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.plugin(slug);


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    avatar: { type: String, default: "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" },
    birth: { type: String, default:"1/1/1990" },
    address: { type: String, },
    admin: { type: Boolean, default: false },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
}, {
    timestamps: true
}
);


const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    filePath: { type: String },
    fileName: { type: String },
    data: { type: String },
    img: { type: String, default: "https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_1280.png" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    slug: { type: String, slug: "name", unique: true },
    tags: { type: String }
},
    {
        timestamps: true
    });
    documentSchema.plugin(mongooseDelete, { deletedAt: true });
    documentSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
    documentSchema.plugin(mongoosePaginate);

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },

    slug: { type: String, slug: "name", unique: true }
},
    {
        timestamps: true
    });
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug: { type: String, slug: "name", unique: true }
},
    {
        timestamps: true
    });



let Document = mongoose.model('Document', documentSchema);
let User = mongoose.model('User', userSchema);
let Category = mongoose.model('Category', categorySchema);
let Tags = mongoose.model('Tags', tagSchema);

export { Document, User, Category, Tags };
