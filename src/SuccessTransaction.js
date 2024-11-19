import React from 'react';
import { Link } from 'react-router-dom';
import './successTransaction.css'; // CSS file for styling

function SuccessTransaction() {
  return (
    <div className="success-container">
      <h2 className="success-title">Transaction Successful!</h2>
      <p className="success-message">Your transaction has been completed successfully.</p>
      <Link to="/" className="return-btn">
        Return to Homepage
      </Link>
    </div>
  );
}

export default SuccessTransaction;
