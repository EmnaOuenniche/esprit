
import express from 'express';

import { createRec,getAllRec,getRecById , updateRec,getUserRec} from '../controllers/reclamation.js';
const router = express.Router();

router
  .route('/createRec')
  .post(createRec);
  router
  .route('/AllRec')
  .post(getAllRec);
  router
  .route('/RecById')
  .post(getRecById);
  router
  .route('/getUserRec')
  .post(getUserRec);
  router 
  .route('/updateRec')
  .post(updateRec)

  export default router;
