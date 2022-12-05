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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
//Servicio para abrir la conexion con mongo
class MongoService {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = null;
            if (conn === null) {
                conn = mongoose_1.default
                    .connect(config_1.default.databaseString, {
                    serverSelectionTimeoutMS: 5000,
                })
                    .then(() => mongoose_1.default);
                console.log('Database connected');
            }
            return conn;
        });
    }
}
exports.default = MongoService;
