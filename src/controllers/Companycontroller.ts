import { Router, Request, Response } from "express";
import ICompany from "../models/ICompany";
import CompanyService from "../services/CompanyService";

const CompanyController: Router = Router();

CompanyController.post('/', async (request: Request, response: Response) => {
  try {
    const company: ICompany = request.body;
    const serviceResult = await CompanyService.createCompany(company);
    response.send({ status: "ok", result: serviceResult });
  } catch (error) {
    response.status(500).send({ status: "failed", result: error });
  }
});

CompanyController.get("/", async (request: Request, response: Response) => {
  try {
    const serviceResult = await CompanyService.getCompany();
    response.send({ status: "ok", result: serviceResult });
  } catch (error) {
    response.status(500).send({ status: "failed", result: error });
  }
});

CompanyController.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id: Object = request.params.id;
    const serviceResult = await CompanyService.deleteCompany(id);
    response.send({ status: 'ok', result: serviceResult });
  } catch (error) {
    response.status(500).send({ status: 'Failed', result: error });
  }
});

CompanyController.put('/:id', async (request: Request, response: Response) => {
  try {
    const id: Object = request.params.id;
    const company: ICompany = request.body;
    const serviceResult = await CompanyService.editCompany(id, company);
    console.log(serviceResult);
    response.send({ status: 'ok', result: serviceResult })
  } catch (error) {
    response.status(500).send({ status: 'Failed', result: error });
  }
});

export default CompanyController;