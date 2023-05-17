import express from 'express';
import multer from "../middlewares/multer-config.js";

import {  createNews,  getAllNews,  addComment, getComments } from "../controllers/news.js";
const router = express.Router();

router.route("/createNews").post(multer("imageUrl", 512 * 1024) , createNews);

router.route('/getAllNews').get(getAllNews);

router.route("/postComment/:postId").patch(addComment)

router.route("/getComment/:postId").get(getComments);


export default router;