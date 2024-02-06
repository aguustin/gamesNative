import express from 'express';
import { port } from './config.js';
import { dbConnection } from './database.js';
import morgan from 'morgan';
import cors from "cors";
import gamesRoutes from './routes/gamesRoutes.js';
import userRoutes from './routes/authRoutes.js';
//import passport from 'passport';
//import session from 'express-session';
//import LocalStrategy from 'passport-local'
dbConnection();
const app = express();
//settings
//middlewares

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));

/*ver como poner en eso todo esto : -->
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
  // This is the basic express session({..}) initialization.
  app.use(passport.initialize()) 
  // init passport on every route call.
  app.use(passport.session())    
  // allow passport to use "express-session".

  //passport.use(new LocalStrategy (authUser)) */ 

//routes
app.use(userRoutes);
app.use(gamesRoutes);

//listen

app.listen(port);
console.log("port: ", port);