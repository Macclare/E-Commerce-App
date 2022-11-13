import express, { NextFunction, Request, Response } from "express"
const UserRoutes = express.Router();
import * as UserServices from "../services/users";
import { validateUser, validateLogin } from "../utils/usersValidation";
import MSG_TYPES from "../utils/validation/msgTypes";
import * as ProductService from "../services/product";
import { verifyToken } from "../middlewares/auth";
// import express from 'express';

//import router from "../routes";

declare module 'express-session' {
	interface SessionData {
		user: any
	}
}

export const signup = async (req: Request, res: Response) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const user = await UserServices.signup(req.body);
		res.status(201).redirect('/dashboard');
		//res.status(201).json({ message: MSG_TYPES.ACCOUNT_CREATED, user });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { error } = validateLogin(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const user = await UserServices.login(req.body);
		// res.status(200).redirect('/dashboard');
		const products = await ProductService.getProductsByUser(user.id);

		req.session.regenerate(function (err) {
			if(err) throw new Error(err)

			req.session.user = user;
		req.session.save(function (err) {
			if (err) throw new Error(err)
			res.status(301).redirect('dashboard')
		})
	})
		return
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const home = async (req: Request, res: Response) => {
	try {
		const products = await ProductService.getProducts();
		// console.log(products[0].dataValues)
		res.render('pages/index', { products })
	} catch (err) {
		console.log(err)
	}
}

export const loggin = (req: Request, res: Response) => {
	res.render('pages/login')
}

export const signin = (req: Request, res: Response) => {
	res.render('pages/signup')
}


export const show = async (req: Request, res: Response) => {
	try {
		const product = await ProductService.getProductById(+req.params.id);
		res.render('pages/show', {section: product})
	} catch (err) {
		console.log(err)
	}
}

export const dashboard = (req: Request, res: Response) => {
	res.render('pages/dashboard')
}
export const addproduct = (req: Request, res: Response) => {
	res.render('pages/addproduct')
}
export const logout = function (req: Request, res: Response, next: NextFunction) {
    // logout logic
  
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err)
  
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err)
        res.redirect('/')
      })
    })
  }