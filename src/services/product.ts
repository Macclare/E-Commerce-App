import fs from "fs";
import path from "path";
import db from "../models";
import HttpError from "../utils/httpError";
import FILE_HOST  from "../config/env";

export const createProduct = async (data:any) =>{
const {
    name, 
    image, 
    brand, 
    category, 
    description, 
    price, 
    countInStock,
    authorId,
    // rating,
    // numReviews
} = data;
const product = await db.Product.create({
    name, 
    image, 
    brand, 
    category, 
    description, 
    price, 
    countInStock,
    authorId,
    // rating,
    // numReviews
})
return product;
}

export const getProducts = async ()=> {
    const products = await db.Product.findAll()
    return products
}

export const getProductById = async(id:Number) => {
    const product = await db.Product.findByPk(id)
    if(!product){
        throw new HttpError("Product not found", 404)
    }
    return product
}

export const updateProduct = async(id:Number, data:any)=> {
    const product = await db.Product.findByPk(id)
    if(!product){
        throw new HttpError("Product not found", 404)
    }
    if(product.authorId !== data.userId){
        throw new HttpError("You are not authorized to update this product", 404)
    }
    const {
        name, 
        image, 
        brand, 
        category, 
        description, 
        price, 
        countInStock,
        rating,
        numReviews 
    }= data
    product.name = name, 
    product.image= image, 
    product.brand = brand, 
    product.category = category, 
    product.description = description, 
    product.price = price, 
    product.countInStock = countInStock,
    product.rating = rating,
    product.numReviews = numReviews
    await product.save();
    return product;
}

export const deleteProduct = async (id:Number, userId:string) => {
    const product = await db.Product.findByPk(id)
    if(!product){
        throw new HttpError("Product not found", 404)
    }
    if(product.authorId !== userId){
        throw new HttpError("You are not authorized to delete this product", 404)
    }
    const imagePath = path.join(
    __dirname, 
    "../public/", 
 product.image.split(`${FILE_HOST}`)[1])

    fs.unlinkSync(imagePath);
    await product.destroy();
    return product;
}

export const rateProduct = async (id:Number, data:any) => {
    const product = await db.Product.findByPk(id);
    if(!product) {
        throw new HttpError("Product not found", 404);
    }
    const { rating, } = data;
    product.rating = (rating + product.rating) / (product.numReviews+1)
    if(product.numReviews){
        product.numReviews += 1
    }else{
        product.numReviews = 1
    }
    await product.save();
    return product;
}

export const getProductsByUser = async (id:Number) => {
    const products = await db.Product.findAll({
        where: {
            authorId: id,
        },
    })
    return products;
}
//export default {createProduct,  getProducts, getProductById, updateProduct, deleteProduct, rateProduct,getProductsByUser }