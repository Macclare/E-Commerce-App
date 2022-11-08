import { Request, Response } from "express";
import * as UserServices from "../services/users";
import { validateUser, validateLogin } from "../utils/usersValidation";
import MSG_TYPES from "../utils/validation/msgTypes";
import * as ProductService from "../services/product";



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
		res.status(200).redirect('/dashboard');
		//res.status(200).json({ message: MSG_TYPES.LOGGED_IN, user });
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
		// console.log(req.params.id)
		const products = await ProductService.getProducts();
		let section = products[req.params.id]
	
		res.render('pages/show', {section})
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
export const edit = (req: Request, res: Response) => {
	res.render('pages/edit')
}
