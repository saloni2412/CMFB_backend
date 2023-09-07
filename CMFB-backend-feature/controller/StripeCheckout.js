const express = require('express');
const stripe = require('stripe')('sk_test_51NXofTKEmCVgUFa9NbZPQmUk4yD74l8S9V9selateW1jI18b7R6OwNm0RmHqwmH55lmTL5jWiRlXFouizoKEhspx00bYUj9UhX'); // Replace with your Stripe secret key
const app = express();
const axios = require('axios');

app.use(express.json());

// API endpoint to handle the donation payment
app.post('/donate', async (req, res) => {
    const { amount, paymentMethodId, username } = req.body;

    console.log(req.body)
  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount*100,
      currency: 'cad',
      payment_method: paymentMethodId,
      confirm: true,
    });

     if (paymentIntent.status === 'succeeded') {
        // Save the donation details in your database (optional)
        // Return a success response to the client
        return res.status(200).json({ message: 'Donation successful', data: paymentIntent });
      } else {
        // Handle other payment statuses if necessary
        return res.status(400).json({ message: 'Payment failed' });
      }
    } catch (error) {
      // Handle any errors that occurred during the payment process
      console.error('Error processing donation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;