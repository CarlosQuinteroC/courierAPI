import UserController from "./controllers/UserController";
import express from "express";
import MongoService from "./services/MongoService";
import AuthController from "./controllers/AuthController";


const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.send('PAge Upp');
});

//User controllers
app.use('/auth', AuthController)
app.use('/user', UserController)


//Start database
MongoService.connect();


export default app;