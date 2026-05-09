import mongoose from "mongoose";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home",
  "Grocery",
  "Luxury",
];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    // Category
    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message: "{VALUE} is not a supported category",
      },
      required: [true, "Category is required"],
      trim: true,
    },

    // Product Image URL
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      default:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },

    // Product Tag
    tag: {
      type: String,
      enum: ["new-arrival", "best-seller", "none"],
      default: "none",
    },

    // Stock Quantity
    stock: {
      type: Number,
      default: 10,
      min: [0, "Stock cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export default Product;