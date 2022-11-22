
import express from 'express';

import { login,signup,forgot , patchOnce} from '../controllers/use.js';
  
const router = express.Router();

router
  .route('/login')
  .post(login);
  router
  .route('/signup')
  .post(signup);
  router
  .route('/forgot')
  .post(forgot);
  router 
  .route('/patchOnce')
  .post(patchOnce)
  export default router;