const nodemailer = require('nodemailer');

class EmailService {
  async sendConfirmationEmail(email, subscription) {
    try {
      // Create transporter with your email service provider details
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your_email@gmail.com',
          pass: 'your_password',
        },
      });

      // Email options
      const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        text: `Thank you for subscribing. Your subscription details:\n\nPlan: ${subscription.planId}\nPayment Method: ${subscription.paymentMethod}\n`,
      };

      // Send email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send confirmation email');
    }
  }
}

module.exports = EmailService;
