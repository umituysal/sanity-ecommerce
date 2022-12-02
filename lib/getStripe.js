import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(`pk_test_51MAZ0lDsFI3Bhvu7yMoauWz0Hgy1MG6UGX1eqJEWtR1lnRn8GqwPMQbsq18CEFyXOLwoYV3hmaxS9pNbfw1ToO4600agOC3cXm`);
  }

  return stripePromise;
}

export default getStripe;