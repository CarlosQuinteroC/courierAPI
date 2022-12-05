"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("./controllers/UserController"));
const express_1 = __importDefault(require("express"));
const MongoService_1 = __importDefault(require("./services/MongoService"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (request, response) => {
    response.send('PAge Upp');
});
//User controllers
app.use('/auth', AuthController_1.default);
app.use('/user', UserController_1.default);
//Start database
MongoService_1.default.connect();
exports.default = app;
