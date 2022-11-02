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
exports.getProductsByUser = exports.rateProduct = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const ProductService = __importStar(require("../services/product"));
const product_1 = __importDefault(require("../utils/product"));
const MSG_TYPES = require("../utils/validation/msgTypes");
const env_1 = __importDefault(require("../config/env"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, product_1.default)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        console.log(req.body);
        console.log(req.file);
        const filepath = req.file.path.split("public")[1];
        const product = yield ProductService.createProduct(Object.assign(Object.assign({}, req.body), { image: `${env_1.default.FILE_HOST}${filepath}`, authorId: req.user.id }));
        res.status(201).json({ message: MSG_TYPES.PRODUCT_CREATED, product });
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductService.getProducts();
        res.status(200).json({ message: MSG_TYPES.PRODUCTS_FOUND, products });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductService.getProductById(req.params.id);
        res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, product });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, product_1.default)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        console.log(req.body);
        console.log(req.file);
        const filepath = req.file.path.split("public")[1];
        const product = yield ProductService.updateProduct(req.params.id, Object.assign(Object.assign({}, req.body), { userId: req.user.id, image: `${env_1.default.FILE_HOST}${filepath}` }));
        res.status(200).json({ message: MSG_TYPES.PRODUCT_UPDATED, product });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id, req.user.id);
        const product = yield ProductService.deleteProduct(req.params.id, req.user.id);
        res.status(200).json({ message: MSG_TYPES.PRODUCT_DELETED, product });
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
const rateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductService.rateProduct(req.params.id, res.body);
        res.status(200).json({ message: MSG_TYPES.PRODUCT_RATED, product });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.rateProduct = rateProduct;
const getProductsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductService.getProductsByUser(req.user.id);
        res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, products });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
exports.getProductsByUser = getProductsByUser;
//export {createProduct,  getProducts, getProductById, updateProduct, deleteProduct, rateProduct, getProductsByUser }
