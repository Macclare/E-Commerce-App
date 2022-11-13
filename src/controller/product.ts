import * as ProductService from "../services/product";
import {Request, Response} from "express"
import validateProduct from "../utils/product";
const MSG_TYPES = require("../utils/validation/msgTypes");
import envSecret from "../config/env";

export const createProduct = async (req: any, res: any) => {
	try {
		delete req.body?.image
		const { error } = validateProduct(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const filepath = req.file.path.split("public")[1];
		const product = await ProductService.createProduct({
			...req.body,
			image: `${envSecret.FILE_HOST}${filepath}`,
			authorId: res.locals?.user?.id,
		});
		res.status(201).redirect("dashboard")
		//res.status(201).json({ message: MSG_TYPES.PRODUCT_CREATED, product });
	} catch (error: any) {
		console.log(error);
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const getProductsForDashboard = async (req:Request, res:Response) => {
	try{
		let products = await ProductService.getProductsByUser(res.locals?.user?.id);
		res.status(200).render("pages/dashboard", {products})
	}
	catch (error:any) {
    res.status(error.statusCode || 500).json({message: error.message});
	}
}

export const getProducts = async (req: any, res: any) => {
	try {
		const products = await ProductService.getProducts();
		res.status(200).json({ message: MSG_TYPES.PRODUCTS_FOUND, products });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const getProductById = async (req: any, res: any) => {
	try {
		const product = await ProductService.getProductById(req.params.id);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, product });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const getProductByIdForEdit = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.getProductById(+req.params.id);
       res.status(200).render('pages/edit', {product});
  } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
   }
}

export const updateProduct = async (req: any, res: any) => {
	try {
		const { error } = validateProduct(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}
		const filepath = req.file.path.split("public")[1];
		const product = await ProductService.updateProduct(req.params.id, {
			...req.body,
			userId: res.locals.user.id,
			image: `${envSecret.FILE_HOST}${filepath}`,
		});
		res.status(301).redirect("/dashboard")
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const deleteProduct = async (req: any, res: any) => {
	try {
		const product = await ProductService.deleteProduct(
			req.params.id,
			res.locals?.user?.id
		);
		res.status(301).redirect("/dashboard");
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const rateProduct = async (req: any, res: any) => {
	try {
		const product = await ProductService.rateProduct(req.params.id, res.body);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_RATED, product });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

export const getProductsByUser = async (req: any, res: any) => {
	try {
		const products = await ProductService.getProductsByUser(
			res.locals?.user?.id
		);
		res.status(200).json({ message: MSG_TYPES.PRODUCT_FOUND, products });
	} catch (error: any) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
};

//export {createProduct,  getProducts, getProductById, updateProduct, deleteProduct, rateProduct, getProductsByUser }
