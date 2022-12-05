"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
app_1.default.set('port', config_1.default.port);
const server = http_1.default.createServer(app_1.default);
server.listen(config_1.default.port);
server.on('listening', () => {
    console.log(`Servidor Arriba en http://localhost:${config_1.default.port}`);
});
