import UserController from './controllers/UserController';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './oas.json';
import MongoService from './services/MongoService';
import AuthController from './controllers/AuthController';
import RoleController from './controllers/RoleController';
import CompanyController from './controllers/Companycontroller';
import OrderController from './controllers/OrderController';
import SessionMiddleware from './middlewares/session';

const app = express();

var options = {
  explorer: true,
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.send('PAge Upp');
});

//User controllers
app.use('/auth', AuthController);
app.use(
  '/user',
  [SessionMiddleware.validateRouteAuthentication],
  UserController
);
app.use(
  '/role',
  [SessionMiddleware.validateRouteAuthentication],
  RoleController
);
app.use(
  '/company',
  [SessionMiddleware.validateRouteAuthentication],
  CompanyController
);
app.use('/order', OrderController);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(
  (err: any, request: Request, response: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    response.status(statusCode).json({
      data: {
        name: err.name,
        message: err.message,
      },
    });
  }
);

//Start database
MongoService.connect();

export default app;
