import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {
        productId: {
            type: String,
            required: [true, "Product ID is required."],
            unique: true
        }
    },
    {timestamps: true}
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;