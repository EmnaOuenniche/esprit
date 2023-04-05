import  {Evenement}  from "../models/evenement.js";

 
export async function createEv(req,res) {
    const { date, description, iduser } = req.body;
    const event = new Evenement();
    event.description = description
    event.date = date
    event.iduser = iduser
    await event.save();
    res.status(201).send(event);
    }


    export async function getAllEv(req, res){
        var event = await Evenement.find();
        res.status(200).send({ event });
      }


    export async function getUserEv(req, res){
        const iduser = req.body.iduser

        const event = await Evenement.findOne({ iduser : iduser });
        res.status(200).send(event);
      }
    

      export async function getEvById(req, res){
        const id = req.body.idev;
        console.log(id);
        var event = await Evenement.findById(id);
        res.status(200).send(event);
      }

      export async function updateEv(req, res){
        const { idev,description, date, userid } = req.body;
        const event = await Evenement.findById(idev);
        if (event) {
            event.date = date
            event.description = description
            event.userid = userid
          await Evenement.save();
    
          res.status(201).send(event);
        } else {
          
          res.status(301).send("erreur");
        }
      }