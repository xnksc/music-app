import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  appInfo: {
    name: "Sound Wave App",
    version: "1.0",
  },
});
