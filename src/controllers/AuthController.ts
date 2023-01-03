import { Router, Request, Response } from 'express';
import OASValidator from '../utils/oasValidator';
import IAuthentication from '../models/IAuthentication';
import authService from '../services/authService';

const authController: Router = Router();
const oasMiddleware = OASValidator.validateRoute();

authController.post(
  '/',
  [oasMiddleware.validate('post', '/auth')],
  async (request: Request, response: Response) => {
    try {
      const credentials: IAuthentication = request.body;
      const resultService = await authService.authenticateUser(credentials);
      response.send({ status: 'Ok', result: resultService });
    } catch (error: any) {
      response.status(error.status ? error.status : 500).send({
        status: 'Failed',
        result: error.message ? error.message : error,
      });
    }
  }
);

export default authController;
