
import multer, { diskStorage } from "multer";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
export default function (image, size) {
  return multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        callback(null, join(__dirname, "../public/images"));
      },
      filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        let newFileName = +new Date() +  extname(file.originalname);
        callback(null, newFileName);
      },
    }),
    limits: size,
  }).single(image);
}