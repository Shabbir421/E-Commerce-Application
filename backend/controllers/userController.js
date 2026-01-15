/** @format */
import User from "../models/userModel.js";

//! Address Controllers
export const addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    const user = req.user;
    // if this is set as default, unset previous default address
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });
    await user.save();
    res.status(201).json({ message: "Address added successfully" });
  } catch (err) {
    console.log("Error in adding address:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAddresses = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    console.log("Error in getting addresses:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    const { addressId } = req.params.id;
    const user = req.user;
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    // if this is set as default, unset previous default address
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
    // Update the address fields
    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;
    await user.save();
    res.status(200).json({ message: "Address updated successfully" });
  } catch (err) {
    console.log("Error in updating address:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = req.user;
    user.addresses.pull(addressId);

    await user.save();
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    console.log("Error in deleting address:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//! Wishlist Controllers
export const getWishlist = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "Wishlist retrieved successfully",
      wishlist: user.wishlist,
    });
  } catch (err) {
    console.log("Error in getting wishlist:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    // Check if product already in wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }
    user.wishlist.push(productId);
    await user.save();
    res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.log("Error in adding to wishlist:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;
    // Check if product is not in wishlist
    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product is not in wishlist" });
    }
    user.wishlist.pull(productId);
    await user.save();
    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (err) {
    console.log("Error in removing from wishlist:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
