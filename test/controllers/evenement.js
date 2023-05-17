import { Evenement } from "../models/evenement.js";


export async function createEv(req, res)
{
  Evenement.create({
  name: req.body.name,
  image:`${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
  date:req.body.date,
  organizer:req.body.organizer,
  description:req.body.description,
  price:req.body.price,
  iduser:req.body.iduser,
  })
  .then(
  res.status(200).json({
  Evenement 
  }))
}


// Get all events
export async function getAllEv(req, res) {
  try {
    const events = await Evenement.find();
    res.status(200).send(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}







// NEW WITH IMAGE EventController.js FROM CHATGPT
/*import { Evenement } from "../models/evenement.js";
import multer from "multer";
import path from "path";

// Define Multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Specify the directory where uploaded images should be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename for the uploaded image
  }
});

// Define Multer upload settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit the file size to 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Only JPEG, JPG, and PNG images are allowed'));
    }
  }
});

// Create a new event with image upload
async function createEv(req, res) {
  try {
    const { name, date, organizer, description, price, iduser } = req.body;
    const event = new Evenement({
      name,
      date,
      organizer,
      description,
      price,
      iduser,
      image: req.file ? '/images/' + req.file.filename : null // Store the URL of the uploaded image in the imageURL property of the Evenement object
    });
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}



// Get events by user ID
async function getUserEv(req, res) {
  try {
    const { iduser } = req.body;
    const events = await Evenement.find({ iduser });
    res.status(200).send(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get event by ID
async function getEvById(req, res) {
  try {
    const { idev } = req.params;
    const event = await Evenement.findById(idev);
    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update an event with image upload
async function updateEv(req, res) {
  try {
    const { idev, name, date, organizer, description, price, iduser } = req.body;
    const event = await Evenement.findById(idev);
    if (event) {
      event.name = name;
      event.date = date;
      event.organizer = organizer;
      event.description = description;
      event.price = price;
      event.iduser = iduser;
      if (req.file) { // Store the URL of the uploaded image in the imageURL property of the Evenement object
        event.image = '/images/' + req.file.filename;
      }
      await event.save();
      res.status(200).send(event);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Export module functions
export {
  createEvWithImageUpload,
  getAllEv,
  getUserEv,
  getEvById,
  updateEvWithImageUpload
};

// Middleware for createEv and updateEv
const createEvMiddleware = upload.single('image');
const updateEvMiddleware = upload.single('image');

// Route handlers with middleware
const createEvWithImageUpload = [createEvMiddleware, createEv];
const updateEvWithImageUpload = [updateEvMiddleware, updateEv];
*/














// NEW WITHOUT IMAGE EventController.js
/*
import { log } from "async";
import { Evenement } from "../models/evenement.js";
const multer = require('multer');
const path = require('path');

export async function createEv(req, res) {
  const {
    name,
    imageURL,
    date,
    organizer,
    description,
    price,
    iduser
  } = req.body;
  const event = new Evenement({
    name,
    imageURL,
    date,
    organizer,
    description,
    price,
    iduser
  });
  await event.save();
  res.status(201).send(event);
}

export async function getAllEv(req, res) {
  const events = await Evenement.find();
  res.status(200).send( events );
}

export async function getUserEv(req, res) {
  const { iduser } = req.body;
  const events = await Evenement.find({ iduser });
  res.status(200).send(events);
}


export async function getEvById(req, res) {
  const { idev } = req.params;
  const event = await Evenement.findById(idev);
  if (event) {
    res.status(200).send(event);
  } else {
    res.status(404).send("Event not found");
  }
}

export async function updateEv(req, res) {
  const { idev, name, imageURL, date, organizer, description, price, iduser } =
    req.body;
  const event = await Evenement.findById(idev);
  if (event) {
    event.name = name;
    event.imageURL = imageURL;
    event.date = date;
    event.organizer = organizer;
    event.description = description;
    event.price = price;
    event.iduser = iduser;
    await event.save();
    res.status(200).send(event);
  } else {
    res.status(404).send("Event not found");
  }
}
*/





