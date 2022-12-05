"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = __importDefault(require("../middlewares/session"));
const UserService_1 = __importDefault(require("../services/UserService"));
const UserController = (0, express_1.Router)();
UserController.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResult = yield UserService_1.default.getUSer();
        response.send({ status: "Ok", result: serviceResult });
    }
    catch (error) {
        response.status(500).send({ status: "Failed", result: error });
    }
}));
UserController.post('/', [session_1.default.validateRouteAuthentication], (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = request.body;
        const serviceResult = yield UserService_1.default.createUser(user);
        response.send({ status: "Ok", result: serviceResult });
    }
    catch (error) {
        response.status(500).send({ status: "Failed", result: error });
    }
}));
UserController.put('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        const user = request.body;
        const serviceResult = yield UserService_1.default.editUser(userId, user);
        response.send({ status: "Ok", result: serviceResult });
    }
    catch (error) {
        response.status(500).send({ status: "Faile", result: error });
    }
}));
UserController.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        const serviceResult = yield UserService_1.default.deleteUser(userId);
        response.send({ status: "Ok", result: serviceResult });
    }
    catch (error) {
        response.status(500).send({ status: "Failed", result: error });
    }
}));
UserController.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.params.id;
        const serviceResult = yield UserService_1.default.findById(userId);
        response.send(serviceResult);
    }
    catch (error) {
        response.status(500).send({ status: "Ok", result: error });
    }
}));
exports.default = UserController;
