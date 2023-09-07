import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from './DonationForm';

const stripePromise = loadStripe('pk_test_51NXofTKEmCVgUFa92cU1VoSfHtlZGBNcFGveiuUIekOWjgpmMGiDiCNveaUTQF4sOkL9H0Fy9nQ7Y13cjmHq0AKF00vpL1Fq9b');

const DonateNow = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
};

export default DonateNow;
