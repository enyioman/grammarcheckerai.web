const mongoose = require("mongoose");
const { v4 } = require("uuid");
const { environment } = require("../../config/environment");
const { JWT_SECRET } = environment;

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    interval: {
      type: String,
      enum: ["monthly", "quarterly", "annually", "weekly"],
      default: "monthly",
      required: true,
    },
    paymentGateway: {
      type: String,
      enum: ["paystack", "flutterwave", "stripe"],
      default: "paystack",
    },
    amount: {
      type: Number,
      required: [true, "A subscription must have a price"],
    },
    txref: {
      type: String,
    },
    status: {
      type: String,
      enum: ["initiated", "pending", "succesful", "failed"],
      default: "initiated",
    },
    currency: {
      type: String,
      enum: ["NGN", "USD", "EUR", "YEN", "GBP"],
      default: "NGN",
    },
    nextSubscriptionDate:{
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
