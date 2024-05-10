const Payment = require('../models/Payment');
const User = require('../models/User');
const bcrypt = require('bcrypt');

 registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// controllers/userController.js
const User = require('../models/User');

exports.selectSubscription = async (req, res) => {
  try {
    const { userId, subscriptionPlan } = req.body;

    // Update the user's subscription plan directly in the database
    await User.findByIdAndUpdate(userId, { subscription: subscriptionPlan });

    res.status(200).json({ message: 'Subscription plan updated successfully' });
  } catch (error) {
    console.error('Error selecting subscription plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// controllers/PaymentController.js


exports.processPayment = async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;

    // Simulate payment processing (replace with actual payment gateway integration)
    const paymentResult = await simulatePaymentProcessing(amount, paymentMethod);

    if (paymentResult.success) {
      // Update user's subscription
      await User.findByIdAndUpdate(userId, { subscription: req.params.subscriptionId });

      // Save payment details
      const payment = new Payment({
        userId,
        amount,
        paymentMethod,
        transactionId: paymentResult.transactionId
      });
      await payment.save();

      return res.status(200).json({ message: 'Payment processed successfully' });
    } else {
      return res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Simulated function to process payment (replace with actual payment gateway integration)
async function simulatePaymentProcessing(amount, paymentMethod) {
  // Simulate payment processing and return a result
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.8; // 80% success rate
      const transactionId = success ? '1234567890' : null;
      resolve({ success, transactionId });
    }, 1000); // Simulate delay of 1 second
  });
}

// controllers/PaymentController.js

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// exports.processPayment = async (req, res) => {
//   try {
//     const { userId, amount, paymentMethod } = req.body;

//     // Create a payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Amount in cents
//       currency: 'usd',
//       payment_method: paymentMethod, // Payment method ID obtained from frontend
//       confirm: true
//     });

//     // If payment is successful
//     if (paymentIntent.status === 'succeeded') {
//       // Update user's subscription
//       await User.findByIdAndUpdate(userId, { subscription: req.params.subscriptionId });

//       // Save payment details
//       const payment = new Payment({
//         userId,
//         amount,
//         paymentMethod: 'Stripe', // For simplicity, assuming payment method is Stripe
//         transactionId: paymentIntent.id
//       });
//       await payment.save();

//       return res.status(200).json({ message: 'Payment processed successfully' });
//     } else {
//       return res.status(400).json({ message: 'Payment failed' });
//     }
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

