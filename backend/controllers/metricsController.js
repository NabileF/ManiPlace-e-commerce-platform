const asyncHandler = require('express-async-handler');
const BulkOrder = require('../models/bulkOrder.models');
const Buyer = require('../models/buyer.models');
const Supplier = require('../models/supplier.models');
const Feedback = require('../models/feedback.models'); 

// Calculate the number of orders
const calculateNumberOfOrders = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const totalOrders = await BulkOrder.countDocuments({
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    status: { $ne: 'Cancelled' }
  });

  res.json({ totalOrders });
});

// Calculate customer retention rate
const calculateCustomerRetentionRate = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const returningCustomers = await Buyer.aggregate([
    { $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
    { $group: { _id: "$_id", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  const totalCustomers = await Buyer.countDocuments({
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
  });

  const retentionRate = (returningCustomers.length / totalCustomers) * 100;

  res.json({ retentionRate });
});

// Calculate customer satisfaction score
const calculateCustomerSatisfactionScore = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find();

  const satisfactionScore = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;

  res.json({ satisfactionScore });
});

// Generate engagement metrics report
const generateEngagementMetricsReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const totalOrders = await BulkOrder.countDocuments({
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    status: { $ne: 'Cancelled' }
  });

  const returningCustomers = await Buyer.aggregate([
    { $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
    { $group: { _id: "$_id", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  const totalCustomers = await Buyer.countDocuments({
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
  });

  const retentionRate = (returningCustomers.length / totalCustomers) * 100;

  const feedbacks = await Feedback.find();

  const satisfactionScore = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;

  res.json({ totalOrders, retentionRate, satisfactionScore });
});

module.exports = {
  calculateNumberOfOrders,
  calculateCustomerRetentionRate,
  calculateCustomerSatisfactionScore,
  generateEngagementMetricsReport
};
