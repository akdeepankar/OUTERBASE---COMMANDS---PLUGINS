
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

async function userCode() {
  try {
    const stripeSecretKey = 'STRIPE SECRET KEY';

    // GET request to retrieve payment data 
    const stripeUrl = 'https://api.stripe.com/v1/payment_intents';

    const authHeader = 'Basic ' + btoa(stripeSecretKey + ':');

    const response = await fetch(stripeUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Payment data fetched successfully:', data);
      return data;
    } else {
      console.error('Failed to fetch payment data:', response.statusText);
      return 'Failed to fetch payment data.';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred.';
  }
}
