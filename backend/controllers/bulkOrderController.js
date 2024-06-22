const mongoose = require('mongoose');
const BulkOrder = require('../models/bulkOrder.models');
const { Types } = require('mongoose');

//buyer notification
const notifyBuyer = (buyerId, message) => {
  console.log(`Notifying buyer ${buyerId}: ${message}`);
};

// Get all bulk orders
const getBulkOrders = async (req, res) => {
  try {
    const bulkOrders = await BulkOrder.find({ supplier: req.supplier.id });
    res.status(200).json(bulkOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new bulk order
const createBulkOrder = async (req, res) => {
  const { products, buyerId, requestedDeliveryDate } = req.body;

  try {
    const productEntries = await Promise.all(products.map(async ({ productName, quantity }) => {
      const product = await Product.findOne({ name: productName });
      if (!product) {
        throw new Error(`Product not found: ${productName}`);
      }
      return {
        product: product._id,
        quantity
      };
    }));

    const newBulkOrder = new BulkOrder({
      supplier: req.supplier.id,
      buyer: buyerId,
      products: productEntries,
      requestedDeliveryDate,
    });

    const savedBulkOrder = await newBulkOrder.save();
    res.status(201).json(savedBulkOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Batch process multiple orders
const batchProcessOrders = async (req, res) => {
  const { orderIds, status } = req.body;

  try {
    const updatedOrders = await BulkOrder.updateMany(
      { _id: { $in: orderIds }, supplier: req.supplier.id },
      { status }
    );

    const orders = await BulkOrder.find({ _id: { $in: orderIds } });
    orders.forEach(order => {
      notifyBuyer(order.buyer, `Your order status has been updated to ${status}.`);
    });

    res.status(200).json({ message: `${updatedOrders.modifiedCount} orders updated to ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await BulkOrder.findOneAndUpdate(
      { _id: orderId, supplier: req.supplier.id },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    notifyBuyer(order.buyer, `Your order status has been updated to ${status}.`);

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const { cancellationReason } = req.body;

  try {
    const order = await BulkOrder.findOneAndUpdate(
      { _id: orderId, supplier: req.supplier.id },
      { status: 'Canceled', cancellationReason },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    notifyBuyer(order.buyer, `Your order has been canceled. Reason: ${cancellationReason}`);

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Order Rejection
const rejectOrder = async (req, res) => {
  const { orderId, rejectionReason } = req.body;

  try {
    if (!Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await BulkOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'Rejected';
    order.rejectionReason = rejectionReason;
    await order.save();

    notifyBuyer(order.buyer, `Your order ${orderId} was rejected. Reason: ${rejectionReason}`);

    res.status(200).json({ message: 'Order rejected successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  getBulkOrders, 
  createBulkOrder, 
  batchProcessOrders, 
  updateOrderStatus, 
  cancelOrder, 
  rejectOrder
};
