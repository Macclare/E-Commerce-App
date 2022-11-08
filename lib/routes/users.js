"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes = express_1.default.Router();
const users_1 = require("../controller/users");
const UserControllers = __importStar(require("../controller/users"));
UserRoutes.post("/signup", UserControllers.signup);
UserRoutes.post("/login", UserControllers.login);
UserRoutes.get('/home', users_1.home);
UserRoutes.get('/login', users_1.loggin);
UserRoutes.get('/signup', users_1.signin);
UserRoutes.get('/show/:id', users_1.show);
UserRoutes.get('/dashboard', users_1.dashboard);
UserRoutes.get('/addproduct', users_1.addproduct);
UserRoutes.get('/edit', users_1.edit);
exports.default = UserRoutes;
