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
const authService_1 = __importDefault(require("../services/authService"));
const authController = (0, express_1.Router)();
authController.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = request.body;
        const resultService = yield authService_1.default.authenticateUser(credentials);
        response.send({ status: 'Ok', result: resultService });
    }
    catch (error) {
        response
            .status(error.status ? error.status : 500)
            .send({
            status: 'Failed',
            result: error.message ? error.message : error,
        });
    }
}));
exports.default = authController;
