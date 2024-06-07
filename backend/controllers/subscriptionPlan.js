const SubscriptionPlan = require("../models/subscriptionPlan.models");
const Supplier = require("../models/supplier.models");
const TrialSession = require("../models/trialsession");


const handleResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({ message, ...data });
};


const handleError = (res, error, statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({ message: "Server error", error: error.message });
};


const addSubscription = async (req, res) => {
  const { name, features, price, accessLevel } = req.body;
  
  try {
    const newSubscription = new SubscriptionPlan({ name, features, price, accessLevel });
    await newSubscription.save();
    handleResponse(res, 200, "New subscription created", { newSubscription });
  } catch (error) {
    handleError(res, error, 400);
  }
};


const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionPlan.find();
    handleResponse(res, 200, "Subscriptions retrieved", { subscriptions });
  } catch (error) {
    handleError(res, error);
  }
};


const viewSubscriptionDetails = async (req, res) => {
  const { id } = req.params;
  
  try {
    const subscription = await SubscriptionPlan.findById(id);
    if (!subscription) {
      return handleResponse(res, 404, "Subscription not found");
    }
    handleResponse(res, 200, "Subscription retrieved", { subscription });
  } catch (error) {
    handleError(res, error);
  }
};


const updateSubscriptionPlan = async (req, res) => {
  const { id } = req.params;
  const { name, features, price, accessLevel } = req.body;
  
  try {
    const updatedSubscription = await SubscriptionPlan.findByIdAndUpdate(
      id,
      { name, features, price, accessLevel },
      { new: true }
    );
    if (!updatedSubscription) {
      return handleResponse(res, 404, "Subscription plan not found");
    }
    handleResponse(res, 200, "Subscription plan updated successfully", { updatedSubscription });
  } catch (error) {
    handleError(res, error);
  }
};


const deleteSubscriptionPlan = async (req, res) => {
  const { id } = req.params;
  
  try {
    const subscriptionPlan = await SubscriptionPlan.findById(id);
    if (!subscriptionPlan) {
      return handleResponse(res, 404, "Subscription plan not found");
    }
    await subscriptionPlan.delete();
    handleResponse(res, 200, "Subscription plan deleted successfully", { subscriptionPlan });
  } catch (error) {
    handleError(res, error);
  }
};


const startTrialSession = async (req, res) => {
  const { userId, subscriptionPlanId } = req.body;
  
  try {
    const activeSession = await TrialSession.findOne({ userId, endTime: null });
    if (activeSession) {
      return handleResponse(res, 400, "Your session is active");
    }

    const newSession = new TrialSession({ userId, subscriptionPlanId });
    await newSession.save();

    await Supplier.findByIdAndUpdate(userId, { $push: { trialSessions: newSession._id } });

    handleResponse(res, 201, "Session started", { newSession });
  } catch (error) {
    handleError(res, error);
  }
};


const endTrialSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await TrialSession.findById(sessionId);
    if (!session) {
      return handleResponse(res, 404, "Session not found");
    }

    session.endTime = new Date();
    await session.save();

    handleResponse(res, 200, "Session ended", { session });
  } catch (error) {
    handleError(res, error);
  }
};


const subscribeToPlan = async (req, res) => {
  const { supplierId } = req.body;
  const { id: planId } = req.params;

  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return handleResponse(res, 404, "Supplier not found");
    }

    const selectedPlan = await SubscriptionPlan.findById(planId);
    if (!selectedPlan) {
      return handleResponse(res, 404, "Plan not found");
    }

    supplier.selectedPlanId = selectedPlan._id;
    await supplier.save();

    handleResponse(res, 200, "Welcome to your subscription plan", { selectedPlan });
  } catch (error) {
    handleError(res, error);
  }
};


const upgrade = async (req, res) => {
  const { supplierId } = req.body;

  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return handleResponse(res, 404, "Supplier not found");
    }

    const currentPlan = await SubscriptionPlan.findById(supplier.selectedPlanId);
    if (!currentPlan) {
      return handleResponse(res, 404, "Current plan not found");
    }

    let nextPlan;
    switch (currentPlan.name) {
      case "basic":
        nextPlan = await SubscriptionPlan.findOne({ name: "standard" });
        break;
      case "standard":
        nextPlan = await SubscriptionPlan.findOne({ name: "premium" });
        break;
      case "premium":
        return handleResponse(res, 200, "Limit reached, you can no longer upgrade");
    }

    if (nextPlan) {
      supplier.selectedPlanId = nextPlan._id;
      await supplier.save();
      handleResponse(res, 200, "Subscription upgraded", { oldPlan: currentPlan.features, newPlan: nextPlan.features });
    } else {
      handleResponse(res, 404, "Next plan not found");
    }
  } catch (error) {
    handleError(res, error);
  }
};


const downgrade = async (req, res) => {
  const { supplierId } = req.body;

  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return handleResponse(res, 404, "Supplier not found");
    }

    const currentPlan = await SubscriptionPlan.findById(supplier.selectedPlanId);
    if (!currentPlan) {
      return handleResponse(res, 404, "Current plan not found");
    }

    let previousPlan;
    switch (currentPlan.name) {
      case "premium":
        previousPlan = await SubscriptionPlan.findOne({ name: "standard" });
        break;
      case "standard":
        previousPlan = await SubscriptionPlan.findOne({ name: "basic" });
        break;
      case "basic":
        return handleResponse(res, 200, "Limit reached, you can no longer downgrade");
    }

    if (previousPlan) {
      supplier.selectedPlanId = previousPlan._id;
      await supplier.save();
      handleResponse(res, 200, "Subscription downgraded", { oldPlan: currentPlan.features, newPlan: previousPlan.features });
    } else {
      handleResponse(res, 404, "Previous plan not found");
    }
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  addSubscription,
  getAllSubscriptions,
  viewSubscriptionDetails,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  startTrialSession,
  endTrialSession,
  subscribeToPlan,
  upgrade,
  downgrade,
};