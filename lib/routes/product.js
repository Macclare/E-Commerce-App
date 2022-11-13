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
const router = express_1.default.Router();
const ProductController = __importStar(require("../controller/product"));
const { upload, fileSizeLimitErrorHandler } = require("../middlewares/multer");
const auth_1 = require("../middlewares/auth");
router.post("/", auth_1.verifyToken, upload === null || upload === void 0 ? void 0 : upload.single("image"), fileSizeLimitErrorHandler, ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", auth_1.verifyToken, upload === null || upload === void 0 ? void 0 : upload.single("image"), fileSizeLimitErrorHandler, ProductController.updateProduct);
router.delete("/:id", auth_1.verifyToken, ProductController.deleteProduct);
router.post("/:id/reviews", ProductController.rateProduct);
router.get("/:user/products", auth_1.verifyToken, ProductController.getProductsByUser);
exports.default = router;
// function single(
// 	arg0: string
// ): import("express-serve-static-core").RequestHandler<
// 	{},
// 	any,
// 	any,
// 	import("qs").ParsedQs,
// 	Record<string, any>
// > {
// 	throw new Error("Function not implemented.");
// }
