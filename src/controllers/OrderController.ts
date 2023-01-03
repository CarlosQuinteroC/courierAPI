import { Router, Request, Response } from "express";
import { request } from "http";
import IOrder from "../models/IOrders";
import OrderService from "../services/OrderService";

const OrderController: Router = Router();

OrderController.post('/', async (request: Request, response: Response) => {
  try {
    const order: IOrder = request.body;
    const serviceResult = await OrderService.createOrder(order);
    response.send({ status: "ok", result: serviceResult });
  } catch (error) {
    response.status(500).send({ status: "failed", result: error });
  }
});

OrderController.get("/", async (request: Request, response: Response) => {
  try {
    const serviceResult = await OrderService.getOrder();
    response.send({ status: "ok", result: serviceResult });
  } catch (error) {
    response.status(500).send({ status: "failed", result: error });
  }
});

OrderController.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id: Object = request.params.id;
    const serviceResult = await OrderService.deleteOrder(id);
    response.send({ status: 'ok', result: serviceResult });
  } catch (error) {
    response.status(500).send({ status: 'Failed', result: error });
  }
});

OrderController.put('/:id', async (request: Request, response: Response) => {
  try {
    const id: Object = request.params.id;
    const role: IOrder = request.body;
    const serviceResult = await OrderService.editOrder(id, role);
    console.log(serviceResult);
    response.send({ status: 'ok', result: serviceResult })
  } catch (error) {
    response.status(500).send({ status: 'Failed', result: error });
  }
});

OrderController.get('/:id', async(request: Request, response: Response) => {
try {
  const id = request.params.id;
  const serviceResult = await OrderService.findById(id);
  response.send( { status: 'Ok', result: serviceResult } )
} catch (error) {
  response.status(500).send({ status: 'Failed', result: error });
}
});

export default OrderController;