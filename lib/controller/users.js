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
exports.logout = exports.addproduct = exports.dashboard = exports.show = exports.signin = exports.loggin = exports.home = exports.login = exports.signup = void 0;
const express_1 = __importDefault(require("express"));
const UserRoutes = express_1.default.Router();
const UserServices = __importStar(require("../services/users"));
const usersValidation_1 = require("../utils/usersValidation");
const ProductService = __importStar(require("../services/product"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateUser)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield UserServices.signup(req.body);
        res.status(201).redirect('/dashboard');
        //res.status(201).json({ message: MSG_TYPES.ACCOUNT_CREATED, user });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, usersValidation_1.validateLogin)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = yield UserServices.login(req.body);
        // res.status(200).redirect('/dashboard');
        const products = yield ProductService.getProductsByUser(user.id);
        req.session.regenerate(function (err) {
            if (err)
                throw new Error(err);
            req.session.user = user;
            req.session.save(function (err) {
                if (err)
                    throw new Error(err);
                res.status(301).redirect('dashboard');
            });
        });
        return;
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.login = login;
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductService.getProducts();
        // console.log(products[0].dataValues)
        res.render('pages/index', { products });
    }
    catch (err) {
        console.log(err);
    }
});
exports.home = home;
const loggin = (req, res) => {
    res.render('pages/login');
};
exports.loggin = loggin;
const signin = (req, res) => {
    res.render('pages/signup');
};
exports.signin = signin;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductService.getProductById(+req.params.id);
        res.render('pages/show', { section: product });
    }
    catch (err) {
        console.log(err);
    }
});
exports.show = show;
const dashboard = (req, res) => {
    res.render('pages/dashboard');
};
exports.dashboard = dashboard;
const addproduct = (req, res) => {
    res.render('pages/addproduct');
};
exports.addproduct = addproduct;
const logout = function (req, res, next) {
    // logout logic
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null;
    req.session.save(function (err) {
        if (err)
            next(err);
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err)
                next(err);
            res.redirect('/');
        });
    });
};
exports.logout = logout;
