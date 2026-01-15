/** @format */
import cloudinary from "../configs/cloudinary.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

//!product controllers
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product image is required" });
    }
    if (req.files.length > 3) {
      return res
        .status(400)
        .json({ message: "You can upload a maximum of 3 images" });
    }
    const uploadPromises = req.files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
    });
    const uploadResults = await Promise.all(uploadPromises);
    // secure_url
    const imageUrls = uploadResults.map((result) => result.secure_url);
    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      images: imageUrls,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log("Error creating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    // -1 for descending order most recent first
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = parseInt(stock);
    if (price !== undefined) product.price = parseFloat(price);

    // Handle image updates
    if (req.files && req.files.length > 0) {
      if (req.files.length > 3) {
        return res
          .status(400)
          .json({ message: "You can upload a maximum of 3 images" });
      }
      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
      });
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map((result) => result.secure_url);
      product.images = imageUrls;
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//!order controllers
export const getAllOrders = async (req, res) => {
  // Implementation for fetching all orders
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateOrderStatus = async (req, res) => {
  // Implementation for updating order status
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!["Processing", "Shipped", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    if (status === "Shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }
    if (status === "Delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }
    await order.save();
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.log("Error updating order status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//!customer controllers
export const getAllCustomers = async (req, res) => {
  // Implementation for fetching all customers
  try {
    const customers = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ customers });
  } catch (error) {
    console.log("Error fetching customers:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//! stats controllers
export const getDashboardStats = async (req, res) => {
  // Implementation for fetching dashboard statistics
  try {
    const totalOrders = await Order.countDocuments();
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const totalCustomers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
    });
  } catch (error) {
    console.log("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
