import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import './PricingPlans.css'

//https://docs.stripe.com/checkout/embedded/quickstart?lang=node&client=react
const stripePromise = loadStripe('pk_test_51QFipqC5WzPzDwzDLOfPksc6CMtGOSue0KsGRrrIO1hVaqUMghyIGG6q6qMZ2NvhgztGAUK71Ih0N4d5CxMKVK5y00dFmbS4cx'); // Publishable Key

const PricingPlans = () => {
  const handleCheckout = async (priceId) => {
    // eslint-disable-next-line no-unused-vars
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:4000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    const session = await response.json();
    if (session.url) {
      window.location.href = session.url; // Redirect to Stripe Checkout
    }
  };

  return (
    <div className="pricing-container">
      <h2 className="pricing-title">Choose Your Plan</h2>
      <div className="pricing-cards">
        <div className="card">
          <h3>Free Plan</h3>
          <p className="price">$0/month</p>
          <ul className="features">
            <li>Basic Access</li>
            <li>Basic Customer Support</li>
          </ul>
          <button className="select-plan-btn">Free Plan Selected</button>
        </div>

        <div className="card premium">
          <h3>Premium Plan</h3>
          <p className="price">$9.99/month</p>
          <ul className="features">
            <li>All Free Features Plus</li>
            <li>Full Customization </li>
            <li>Priority Support</li>
            <li>Themes</li>
            <li>Analytics Dashboard</li>
            <li>Unlimited Forms</li>
          </ul>
          <button
            className="select-plan-btn"
            onClick={() => handleCheckout("price_1QFjNRC5WzPzDwzDpwkbHYHt")}
          >
            Subscribe to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
