"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MSG_TYPES = Object.freeze({
    ACCOUNT_CREATED: "Account successfully created",
    LOGGED_IN: "Successfully logged in",
    PRODUCT_DELETED: "Product deleted successfully",
    PRODUCT_UPDATED: "Product updated successfully",
    PRODUCT_CREATED: "Product created successfully",
    PRODUCTS_CREATED: "Product created successfully",
    PRODUCT_FETCHED: "Product fetched successfully",
    DELETED: "Resource deleted successfully",
    UPDATED: "Resource updated successfully",
    CREATED: "Resource created successfully",
    FETCHED: "Resource fetched successfully",
    ACCOUNT_VERIFIED: "Account successfully verified",
    ORDER_POSTED: "Order successfully posted",
    AWAIT_ADMIN: "Account successfully verified. Awaiting response",
    ACCOUNT_EXIST: "Account already exist.",
    ACCOUNT_INVALID: "Invalid email or password",
    SUSPENDED: "Account is suspended",
    INACTIVE: "Account is inactive.",
    DISABLED: "Account is disabled",
    NOT_FOUND: "Not found",
    ACCESS_DENIED: "Access denied",
    UPLOAD_IMAGE: "Image upload is required.",
    SESSION_EXPIRED: "Access denied. Your session has expired",
    PERMISSION: "You do not have enough permission",
    SERVER_ERROR: "Server Error",
    ACCOUNT_DELETED: "Account no longer exists",
    INVALID_PASSWORD: "Invalid password",
    WALLET_FUNDED: "Your wallet has been funded",
    NOT_ALLOWED: "This operation is not allowed"
});
exports.default = MSG_TYPES;
