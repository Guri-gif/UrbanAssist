const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res, next) => {
  const { amount, serviceName } = req.body;

  try {
    const amountInCents = amount * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5175/success",
      cancel_url: "http://localhost:5175/cancel",
    });

    res.send({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating payment session:", err);
    res.status(500).send({ error: err.message });
  }
};

module.exports = payment;
