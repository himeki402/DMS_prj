import multer from 'multer';
import { diskStorage } from 'multer';
import { join } from 'path';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/pdf'); // Thư mục lưu trữ tệp trên máy chủ
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;