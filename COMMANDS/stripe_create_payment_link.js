
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

async function userCode() {
    try {
      const stripeSecretKey = 'STRIPE SECRET KEY';
  
      // Price ID. 
      const priceId = 'PRICE ID';
  
      const stripeUrl = 'https://api.stripe.com/v1/payment_links';
      const authHeader = 'Basic ' + btoa(stripeSecretKey + ':');
  
      const requestBody = new URLSearchParams();
      requestBody.append('line_items[0][price]', priceId);
      requestBody.append('line_items[0][quantity]', '1');
  
      const response = await fetch(stripeUrl, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(),
      });
  
      const data = await response.json();
      console.log('Test payment link created:', data.url);
      return data.url;
    } catch (error) {
      console.error('Failed to create test payment link:', error);
      return 'Failed to create test payment link.';
    }
  }

  