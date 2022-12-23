import UserController from "./controllers/UserController";
import express from "express";
import MongoService from "./services/MongoService";
import AuthController from "./controllers/AuthController";
import RoleController from "./controllers/RoleController";
import CompanyController from "./controllers/Companycontroller";
import OrderController from "./controllers/OrderController";
import SessionMiddleware from "./middlewares/session";


const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.send('PAge Upp');
});

//User controllers
app.use('/auth', AuthController);
app.use('/user',[SessionMiddleware.validateRouteAuthentication], UserController);
app.use('/role',[SessionMiddleware.validateRouteAuthentication], RoleController);
app.use('/company',[SessionMiddleware.validateRouteAuthentication], CompanyController);
app.use('/order', OrderController)



//Start database
MongoService.connect();


export default app;