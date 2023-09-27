
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

async function userCode() {
    const phone = {{request.body.phone}};
    const accountSid = 'S ID';
    const authToken = 'AUTH TOKEN';
    const twilioPhoneNumber = 'TWILIO PHONE NUMBER';
    const messageBody = {{request.body.message}};
  
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  
    const authHeader = 'Basic ' + btoa(`${accountSid}:${authToken}`);
  
    const requestBody = new URLSearchParams();
    requestBody.append('To', phone);
    requestBody.append('From', twilioPhoneNumber);
    requestBody.append('Body', messageBody);
  
    return fetch(twilioUrl, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody.toString(),
    })
    .then(response => response.json())
    .then(data => {
      console.log('SMS sent successfully:', data.sid);
      return 'SMS sent successfully.';
    })
    .catch(error => {
      console.error('Failed to send SMS:', error);
      return 'Failed to send SMS.';
    });
  }
  
  
  