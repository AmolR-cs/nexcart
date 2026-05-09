const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Order = require("./models/order");
const User = require("./models/user");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err.message);
  });

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NexCart backend is running 🚀"
  });
});

// Helper: Validate order input
function validateOrderData(orderData) {
  if (!orderData) return "Order data is missing";

  const { customer, items, summary, orderedAt } = orderData;

  if (!customer) return "Customer details are required";
  if (!customer.fullName) return "Customer full name is required";
  if (!customer.phone) return "Customer phone is required";
  if (!customer.email) return "Customer email is required";
  if (!customer.city) return "Customer city is required";
  if (!customer.address) return "Customer address is required";
  if (!customer.pincode) return "Customer pincode is required";
  if (!customer.paymentMethod) return "Payment method is required";

  if (!items || !Array.isArray(items) || items.length === 0) {
    return "At least one order item is required";
  }

  if (!summary) return "Order summary is required";
  if (typeof summary.subtotal !== "number") return "Subtotal must be a number";
  if (typeof summary.discount !== "number") return "Discount must be a number";
  if (typeof summary.gst !== "number") return "GST must be a number";
  if (typeof summary.delivery !== "number") return "Delivery must be a number";
  if (typeof summary.finalTotal !== "number") return "Final total must be a number";

  if (!orderedAt) return "Order date/time is required";

  return null;
}

/* =========================================
   CREATE ORDER
   POST /api/orders
========================================= */
app.post("/api/orders", async (req, res) => {
  try {
    const orderData = req.body;

    const validationError = validateOrderData(orderData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const newOrder = new Order({
      customer: orderData.customer,
      items: orderData.items,
      summary: orderData.summary,
      orderedAt: orderData.orderedAt,
      status: orderData.status || "Delivered"
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order saved successfully ✅",
      data: savedOrder
    });
  } catch (err) {
    console.error("POST /api/orders Error ❌", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to save order",
      error: err.message
    });
  }
});

/* =========================================
   GET ALL ORDERS
   GET /api/orders
========================================= */
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    console.error("GET /api/orders Error ❌", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message
    });
  }
});

/* =========================================
   GET SINGLE ORDER
   GET /api/orders/:id
========================================= */
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    console.error("GET /api/orders/:id Error ❌", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: err.message
    });
  }
});

/* =========================================
   UPDATE ORDER STATUS
   PUT /api/orders/:id
========================================= */
app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully ✅",
      data: updatedOrder
    });
  } catch (err) {
    console.error("PUT /api/orders/:id Error ❌", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: err.message
    });
  }
});

/* =========================================
   DELETE ORDER
   DELETE /api/orders/:id
========================================= */
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully 🗑️"
    });
  } catch (err) {
    console.error("DELETE /api/orders/:id Error ❌", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: err.message
    });
  }
});
// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({
      success: true,
      message: "Registered successfully"
    });
  } catch (error) {
    console.error("Register error:", error);
    res.json({
      success: false,
      message: "Server error"
    });
  }
});
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({
      success: true,
      message: "Registered successfully"
    });
  } catch (error) {
    console.error("Register error:", error);
    res.json({
      success: false,
      message: "Server error"
    });
  }
});
// LOGIN
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.json({ success: false });
  }

  res.json({ success: true, user });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});