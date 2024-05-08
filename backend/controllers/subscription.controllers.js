const mongoose = require("mongoose");

var subscriptionSchema = new mongoose.Schema(
  {
    
    activationDate : {
      type : Date,
      required: true,
    },
    expirationDate : {
      type : Date,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
    },
    PlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    name: {
        type: String,
        required: true,

      },
      price: {
        type: double,
        required: true,

      },
      features: {
        type: [String],
        required: true,
        default: []

      },
      accessLevel: {
        type: string,
        required: true,
        default: "Basic"
      },

  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
