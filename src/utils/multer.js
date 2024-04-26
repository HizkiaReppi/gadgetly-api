import { extname } from 'path';
import multer from 'multer';

const formatFileName = (filename) => {
  return filename.toLowerCase().replace(/\s+/g, '-');
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpeg') {
      cb(null, './public/images');
    } else if (ext === '.mp4') {
      cb(null, './public/videos');
    } else {
      cb(new Error('File type is not allowed'));
    }
  },

  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${formatFileName(file.originalname)}`);
  },
});

const uploader = multer({ storage });

export default uploader;
