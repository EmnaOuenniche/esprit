import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/use.js';
import NotesRoutes from './routes/notes.js';
import ClasseRoutes from './routes/classe.js';
import AbsenceRoutes from './routes/absence.js';
import EventRoutes from './routes/evenement.js';
import ReclamationRoutes from './routes/reclamation.js';
import NewsRoutes from './routes/news.js';

const app = express();
const port = process.env.PORT || 5000;
const databaseName = 'espritt';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
//mongod --ipv6 
//mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`)
mongoose.connect(`mongodb://0.0.0.0:27017/${databaseName}`)

  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use('/img', express.static('public/images'));

app.use('/user', userRoutes);
app.use('/notes', NotesRoutes);
app.use('/classe', ClasseRoutes);
app.use('/absence', AbsenceRoutes);
app.use('/event', EventRoutes);
app.use('/Reclamation',ReclamationRoutes);
app.use('/news', NewsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


 


/*//////multer //////////////////////////////////////////////////////////////////////////////////////
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Specify the directory where uploaded images should be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()); // Generate a unique filename for the uploaded image
  }
});
const upload = multer({ storage: storage });
////////////////////////////////////////////////////////////////////////////////////////////////////////
*/




/*
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/use.js';
import NotesRoutes from './routes/notes.js';
import ClasseRoutes from './routes/classe.js';
import AbsenceRoutes from './routes/absence.js';
import EventRoutes from './routes/evenement.js';
import ReclamationRoutes from './routes/reclamation.js';

const app = express();
const port = process.env.PORT || 5000;
const databaseName = 'espritt';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());

app.use('/user', userRoutes);
app.use('/notes', NotesRoutes);
app.use('/classe', ClasseRoutes);
app.use('/absence', AbsenceRoutes);
app.use('/event', EventRoutes);
app.use('/Reclamation',ReclamationRoutes);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});*/