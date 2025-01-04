// utils/emailConfig.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "twinklemedia42@gmail.com",
    pass: "axuy hbtj thbc otej"// This should be your Gmail App Password, not your regular Gmail password
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test the connection
const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email server connection verified');
  } catch (error) {
    console.error('Error verifying email connection:', error);
    throw error;
  }
};

// Email template function
const generateOrderConfirmationEmail = (orderDetails) => {
  const { userDetails, paymentId, orderId, amount } = orderDetails;
  
  return {
    from: `"Romala Store" <${process.env.EMAIL_USER}>`,
    to: userDetails.email,
    subject: 'Order Confirmation - Thank you for your purchase!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Confirmation</h2>
        <p>Dear ${userDetails.fullName},</p>
        <p>Thank you for your purchase! Your order has been successfully processed.</p>
        
        <div style="background-color: #f8f8f8; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Order Details:</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Amount Paid:</strong> ₹${amount.toFixed(2)}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3>Shipping Details:</h3>
          <p><strong>Address:</strong> ${userDetails.address}</p>
          <p><strong>Pin Code:</strong> ${userDetails.pinCode}</p>
          <p><strong>Contact:</strong> ${userDetails.contact}</p>
        </div>

        <p>If you have any questions about your order, please don't hesitate to contact us.</p>
        
        <p style="margin-top: 30px;">Best regards,<br>Romala Team</p>
      </div>
    `
  };
};

// Send email function with better error handling
const sendOrderConfirmationEmail = async (orderDetails) => {
  try {
    // Verify connection before sending
    await verifyConnection();
    
    const mailOptions = generateOrderConfirmationEmail(orderDetails);
    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

export { sendOrderConfirmationEmail };
export {verifyConnection};