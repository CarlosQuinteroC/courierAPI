"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
class SessionMiddleware {
    static validateRouteAuthentication(request, response, nextFunction) {
        var _a;
        try {
            const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (token) {
                if (jsonwebtoken_1.default.verify(token, config_1.default.jwtKey)) {
                    const user = Object(jsonwebtoken_1.default.decode(token));
                    response.locals['user'] = {
                        _id: user._id,
                        email: user.email,
                        role: user.role,
                        permisions: user.permisions,
                    };
                    //console.log(response.locals.user);
                    nextFunction();
                }
                else {
                    response
                        .status(401)
                        .send({ status: 'failed', result: 'Sesion no es valida' });
                }
            }
            else {
                response
                    .status(401)
                    .send({
                    status: 'failed',
                    result: 'No tiene acceso a este recurso.',
                });
            }
        }
        catch (error) {
            response
                .status(500)
                .send({
                status: 'failed',
                result: error.message ? error.message : error,
            });
        }
    }
}
exports.default = SessionMiddleware;
