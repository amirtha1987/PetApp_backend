import express, { request } from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";

import petsRoute from './Routes/petsRoute.js'; 

import cors from 'cors';


const app = express();
app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],

// })
// );



app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome to Adopcy PetApp');
});

app.use('/pets', petsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected successfully");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
