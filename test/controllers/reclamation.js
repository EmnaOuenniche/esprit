
import Reclamations from "../models/reclamation.js";
 
export async function createRec(req,res) {
    const { matiere,/* date, */justificatif, iduser} = req.body;
    const reclamation = new Reclamations();
    reclamation.matiere = matiere
    //reclamation.date = date
    reclamation.justificatif = justificatif
    reclamation.iduser = iduser
    await reclamation.save();
    res.status(201).send(reclamation);
    }


    export async function getAllRec(req, res){
        var reclamations = await Reclamations.find();
        res.status(200).send({ reclamations });
      }


    export async function getUserRec(req, res){
        const iduser = req.body.iduser

        const reclamations = await Reclamations.findOne({ iduser : iduser });
        res.status(200).send(reclamations);
      }
    

      export async function getRecById(req, res){
        const id = req.body.idrec;
        console.log(id);
        var reclamation = await Reclamations.findById(id);
        res.status(200).send(reclamation);
      }

      export async function updateRec(req, res){
        const { idrec,matiere,/* date,*/ justificatif/*,userid*/ } = req.body;
        const reclamation = await Reclamations.findById(idabs);
        if (reclamation) {
            reclamation.matiere = matiere
           // reclamation.date = date
            reclamation.justificatif = justificatif
            //reclamation.userid = userid
          await Reclamations.save();
    
          res.status(201).send(reclamation);
        } else {
          
          res.status(301).send("erreur");
        }
      }