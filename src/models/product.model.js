import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    title: String,
    category: String,
    price: Number,
    imgCover: String,
    slug: String,
});
productsSchema.index({ title: 1 });
const Product = mongoose.model("Products", productsSchema);
export default Product;
//# sourceMappingURL=product.model.js.map