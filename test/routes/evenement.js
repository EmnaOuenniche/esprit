import express from 'express';
import multer from "../middlewares/multer-config.js";

//import {createEvWithImageUpload, getAllEv,getEvById, updateEvWithImageUpload, getUserEv} from '../controllers/evenement.js';
import { createEv, getAllEv } from '../controllers/evenement.js';

const router = express.Router();

router
.route("/createEv").post(multer("image", 512 * 1024) , createEv);


//router.route('/createEv').post(createEvWithImageUpload);
//router.route('/createEv').post(createEv);
router.route('/getAllEv').get(getAllEv);
//router.route('/getEvById').get(getEvById);
//router.route('/getUserEv').get(getUserEv);
//router.route('/updateEv').post(updateEvWithImageUpload)

  export default router;