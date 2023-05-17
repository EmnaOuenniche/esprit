
import User from "../models/use.js";
import Classes from "../models/classe.js";
import bcrypt from 'bcrypt';
import async from'async';
import crypto from 'crypto';
import nodemailer from'nodemailer';
import classe from "../models/classe.js";
import Absences from "../models/absence.js";
import Notes from "../models/notes.js";


var saltRounds = 10;
// export async function login(req, res) {
//     User
//     .findOne({ "login": req.body.login, "password": req.body.password })
	
//     .then(doc => {
		
//         res.status(200).json(doc);
//     })
//     .catch(err => {
//         res.status(500).json({ error: err });
//     });
// }
export async function signup(req, res) {
	const  hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
	try{
        const  user = await User.findOne({ email : req.body.email })
        if(user)
        {
            return res.status(500).json(null)
        } 
        else
        {
            const user = new User({
                email: req.body.email,
                password: hashedPwd
            })
            const newUser = await user.save()
            // await Followers.updateMany({ '_id': newUser.followers }, { $push: { users: newUser._id } });
             res.status(200).json(newUser)
        }
    }catch(err)
    {
        return res.json(null)
    }
	}


/*

	export async function login(req, res) {
		const user = await User.findOne({ email: req.body.email });
		//console.log(user)
		if (user) {
		  // check user password with hashed password stored in the database
		  const validPassword = await bcrypt.compare(req.body.password, user.password);
		  if (validPassword) {
			console.log(user._id);
			Classes.findOne({iduser : user._id}).then(async (classe,name,matiere)=> {
				if (!classe)
				return res.status(404).json(null)
				else 
				return res.status(200).json({
					
					email : user.email,
					password : user.password,
					classe : classe.clas,
					name : classe.name,
					matiere : absence.matiere
				})
			})
			
		  }
		else {
		  res.status(400).json({ error: "Invalid Password" });
		}
	  } else {
		res.status(401).json({ error: "User does not exist" });
	  }
};

*/

export async function login(req, res) {
	try {
	  const user = await User.findOne({ email: req.body.email });
	  if (user) {
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (validPassword) {
		  Classes.findOne({ iduser: user._id }).then(async (classe) => {
			if (!classe) {
			  return res.status(404).json(null);
			} else {
			 // const userAbsence = await Absences.findOne({ iduser: user._id });
			 const userAbsence = await Absences.findOne({ iduser: user._id }, { matiere: 1, _id: 0 });
			 const userdateAbs = await Absences.findOne({ iduser: user._id }, { date: 1, _id: 0 });
			 const usermatiere = await Notes.findOne({ iduser: user._id }, { matiere: 1, _id: 0 });
			 const usercc = await Notes.findOne({ iduser: user._id }, { cc: 1, _id: 0 });
			 const userexamen = await Notes.findOne({ iduser: user._id }, { examen: 1, _id: 0 });

			  return res.status(200).json({
				email: user.email,
				password: user.password,
				classe: classe.clas,
				name: classe.name,
				absences: userAbsence.matiere,
				dateabs : userdateAbs.date,
				matiere : usermatiere.matiere,
				cc : usercc.cc,
				examen : userexamen.examen
			  });
			}
		  });
		} else {
		  res.status(400).json({ error: "Mot de passe incorrect" });
		}
	  } else {
		res.status(401).json({ error: "L'utilisateur n'existe pas" });
	  }
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ error: "Erreur du serveur" });
	}
  }
  

export async function getUserEmail(req, res){
	//const iduser = req.body.iduser

	const user = await User.findOne({ email: req.body.email });
	
	//const user = await User.findOne({ iduser : iduser });
	res.status(200).send(user);
}
	export function patchOnce(req, res) {
		User
		.findOneAndUpdate({ "email": req.body.email }, { "password": req.body.password})
		.then(doc => {
			res.status(200).json(doc);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
	}
	  export async function forgot(req, res, next) {
		async.waterfall([
			function (done) {
				crypto.randomBytes(20, function (err, buf) {
					var token = buf.toString('hex');
					done(err, token);
				});
			},
			function (token, done) {
				User.findOne({ email: req.body.email }, function (err, user) {
					if (!user) {
						console.log('No account with that email address exists.')
					}
	
					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	
					user.save(function (err) {
						done(err, token, user);
					});
				});
			},
			function (token, user, done) {
				let smtpTransport= nodemailer.createTransport({
					service: 'gmail',
					auth: {
					  user: 'emna.ouenniche@esprit.tn',
					  pass: 'loicfhwbjlkevfqg'
					}
				
				});
				var mailOptions = {
					to: user.email,
					from: 'emna.ouenniche@esprit.tn',
					subject: 'Password Reset',
					text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
						'http://' + req.headers.host + '/reset/' + token + '\n\n' +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n',
						
				};
				smtpTransport.sendMail(mailOptions, function (err) {
					console.log('mail sent');
					res.send("mail sent");
					done(err, 'done');
				});
			}
		], function (err) {
			if (err) return next(err);
		});

		
	};
/*
	export const updatePassword = async (email, newPassword) => {
		try {
		  // Rechercher l'utilisateur par son adresse email
		  const user = await User.findOne({ email });
		  
		  // Vérifier si l'utilisateur existe
		  if (!user) {
			return { success: false, message: 'Utilisateur non trouvé.' };
		  }
	  
		  // Hash du nouveau mot de passe
		  const hashedPassword = await bcrypt.hash(newPassword, 10);
	  
		  // Mettre à jour le mot de passe de l'utilisateur
		  user.password = hashedPassword;
		  await user.save();
	  
		  return { success: true, message: 'Mot de passe mis à jour avec succès.' };
		} catch (error) {
		  return { success: false, message: error.message };
		}
	  };
	*/

	  export async function forgotPassword (req, res)  {
        const { email } = req.body;
        User.findOne({
      
          email: email
      
        }).then((user) => {
          if (!user) {
            console.log("ssss")
            return res.status(404).json({ "message": "User doesn't exist" });
          }
      
          //check if cookie exists
      
          const otp = Math.floor(100000 + Math.random() * 900000)
          console.log("ssss111")
          var mailOptions = {
            from: 'moviep62@gmail.com',
            to: email,
            subject: 'Reset password',
            html: ` <style>
                      .code {
                        background-color: #4CAF50; /* Green */
                        border: none;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                      }
                      </style>
                      <head>
                      <h1>Reset your password</h1>
                      </head>
                    <body>
                    <h2>Hi </h2>
                    <p>Please use the following code to reset your password</p>
                    <P>  ${otp} </P>
                      </body>`
          };
         
      
          
      //    transporter.sendMail(mailOptions, function(error, info){
        //    if (error) {
         //     console.log(error);
          //  } else {
          
         //   }
         // });
      
      
          //jwt token for otp
          user.otp = otp;
          console.log(otp)
          user.save();
          console.log("ssss222")
          res.status(200).json({ "message": "Email sent" });
        }
        )
          .catch((err) => {
            res.json({ "message": err.message });
          }
          );
      }


	  export async function verifyOtp(req, res) {
        const { email, otp } = req.body;
      
        try {
          const user = await User.findOne({ email });
      
          if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
          }
      
          if (user.otp.toString() !== otp.toString()) {
            return res.status(400).json({ message: "Incorrect OTP" });
          }
      
          user.otp = null;
          await user.save();
      
          return res.status(200).json({ message: "OTP verified" });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      }

	  export async function resetPassword  (req, res) {
		const { email,  newPassword } = req.body;
	  
		User.findOne({
	  
	  
		  email: email,
	  
	  
		})
		  .then((user) => {
			if (!user) {
			  return res.status(404).json({ "message": "User doesn't exist" });
			}
			else {
			  
				bcrypt.hash(newPassword, 12).then((hashedpassword) => {
				  user.password = hashedpassword;
				  user.otp = 0;
				  user.save();
				  res.status(200).json({ "message": "Password changed" });
				});
			 
			}
		  })
		  .catch((err) => {
			res.json({ "message": err.message });
		  });
	  }

