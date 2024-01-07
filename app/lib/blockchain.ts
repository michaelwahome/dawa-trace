"use server"

import connectDB from "@/lib/mongodb";
import Product from "@/models/product";

export const getProduct = async (productId: string) => {
    try {
        connectDB();

        const existingProduct = await Product.findOne({productId: productId})

        return existingProduct;
    } catch (error){
        console.log("getProduct error: ", error)
    }
}