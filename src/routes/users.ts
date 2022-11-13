import express from 'express';
const UserRoutes = express.Router();
import * as ProductController from "../controller/product";
import { verifyToken } from "../middlewares/auth";
import {home, loggin, signin, show, addproduct, logout} from '../controller/users'

import * as UserControllers from "../controller/users";

UserRoutes.post("/signup", UserControllers.signup);
UserRoutes.post("/login", UserControllers.login);

UserRoutes.get('/home', home)
UserRoutes.get('/login', loggin)
UserRoutes.get('/logout', logout)
UserRoutes.get('/signup', signin)
UserRoutes.get('/show/:id', show)

UserRoutes.use(verifyToken)

UserRoutes.get('/dashboard', ProductController.getProductsForDashboard)
UserRoutes.get('/addproduct', addproduct)
UserRoutes.get('/edit/:id', ProductController.getProductByIdForEdit)


export default UserRoutes;