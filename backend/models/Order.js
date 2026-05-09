const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      fullName: {
        type: String,
        required: true,
        trim: true
      },
      phone: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      },
      city: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true,
        trim: true
      },
      pincode: {
        type: String,
        required: true,
        trim: true
      },
      paymentMethod: {
        type: String,
        required: true,
        trim: true
      }
    },
    items: [
      {
        id: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    summary: {
      subtotal: {
        type: Number,
        required: true
      },
      discount: {
        type: Number,
        required: true
      },
      gst: {
        type: Number,
        required: true
      },
      delivery: {
        type: Number,
        required: true
      },
      finalTotal: {
        type: Number,
        required: true
      }
    },
    orderedAt: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Delivered"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);