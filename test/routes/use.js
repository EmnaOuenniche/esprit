
import express from 'express';

import { login,signup,forgot , patchOnce,getUserEmail,resetPassword,forgotPassword,verifyOtp} from '../controllers/use.js';
  
const router = express.Router();

router
  .route('/login')
  .post(login);
  router
  .route('/signup')
  .post(signup);
  /*router
  .route('/updatePwd')
  .post(updatePassword);*/
  router
  .route('/forgot')
  .post(forgot);
  router 
  .route('/patchOnce')
  .post(patchOnce)
  router 
  .route('/getUserEmail')
  .post(getUserEmail)
  router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/verifyotp", verifyOtp);
  export default router;