import express from 'express';

import {createEv, getAllEv,getEvById, updateEv, getUserEv} from '../controllers/evenement.js';

//import { createEv,getAllEv,getEvById , updateEv,getUserEv} from '../controllers/event';
const router = express.Router();

router
  .route('/createEv')
  .post(createEv);
  router
  .route('/getAllEv')
  .get(getAllEv);
  router
  .route('/getEvById')
  .post(getEvById);
  router
  .route('/getUserEv')
  .post(getUserEv);
  router 
  .route('/updateEv')
  .post(updateEv)

  export default router;