import User from "database/user";
import { Router, Request, Response } from "express";
import SessionMiddleware from "../middlewares/session";
import IUser from "../models/IUser";
import UserService from "../services/UserService";

const UserController: Router = Router();

UserController.get('/',async (request:Request, response: Response) => {
    try {
      const serviceResult = await UserService.getUSer();
      response.send({ status: "Ok", result: serviceResult})
    } catch (error) {
      response.status(500).send({status: "Failed", result: error});
    }  
  });

  UserController.post('/',[SessionMiddleware.validateRouteAuthentication],async (request:Request, response: Response) => {
    try {
        const user = request.body;
      const serviceResult = await UserService.createUser(user);
      response.send({ status: "Ok", result: serviceResult})
    } catch (error) {
      response.status(500).send({status: "Failed", result: error});
    }  
  });

  UserController.put('/:id', async(request:Request, response: Response) => {
    try {
      const userId: Object = request.params.id;
      const user: IUser = request.body;
      const serviceResult = await UserService.editUser(userId, user);
      response.send({ status: "Ok", result: serviceResult });
    } catch (error) {
      response.status(500).send({ status: "Faile", result: error });
    }
  });
  
  UserController.delete('/:id', async(request:Request, response: Response) => {
    try {
      const userId: Object = request.params.id;
      const serviceResult = await UserService.deleteUser(userId);
      response.send({ status: "Ok", result: serviceResult })
    } catch (error) {
      response.status(500).send({ status: "Failed", result: error});
    }
  });
  
  UserController.get('/:id', async(request:Request, response:Response) => {
    try {
      const userId: Object = request.params.id;
      const serviceResult = await UserService.findById(userId);
      response.send(serviceResult);
    } catch (error) {
      response.status(500).send({ status: "Ok", result: error });
    }
  });
export default UserController;