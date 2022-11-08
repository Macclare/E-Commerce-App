import express from 'express';
const UserRoutes = express.Router();
import {home, loggin, signin, show, dashboard, addproduct, edit} from '../controller/users'

import * as UserControllers from "../controller/users";

UserRoutes.post("/signup", UserControllers.signup);
UserRoutes.post("/login", UserControllers.login);

UserRoutes.get('/home', home)
UserRoutes.get('/login', loggin)
UserRoutes.get('/signup', signin)
UserRoutes.get('/show/:id', show)
UserRoutes.get('/dashboard', dashboard)
UserRoutes.get('/addproduct', addproduct)
UserRoutes.get('/edit', edit)


export default UserRoutes;