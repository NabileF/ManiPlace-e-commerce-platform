

const Subscription = require('../models/SubscriptionModel');
const PaymentService = require('../Services/paymentService');
const EmailService = require('../Services/emailService');

// Controller function to handle subscription creation
exports.createSubscription = async (req, res) => {
  try {
    // Get subscription details from request body
    const { planId, paymentMethod, paymentInfo } = req.body;

    // Create a new subscription
    const subscription = new Subscription({
      planId,
      paymentMethod,
      paymentInfo,
      userId: req.user._id, // Assuming user is authenticated and user ID is available in req.user
    });

    // Save the subscription
    await subscription.save();

    // Process payment
    const paymentService = new PaymentService();
    const paymentResult = await paymentService.processPayment(paymentMethod, paymentInfo);

    // If payment successful, send email confirmation
    if (paymentResult.success) {
      const emailService = new EmailService();
      await emailService.sendConfirmationEmail(req.user.email, subscription);

      // Return success response
      return res.status(201).json({
        status: 'success',
        data: {
          subscription,
        },
      });
    } else {
      // If payment failed, delete the subscription
      await Subscription.findByIdAndDelete(subscription._id);

      return res.status(400).json({
        status: 'error',
        message: 'Payment failed',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};


