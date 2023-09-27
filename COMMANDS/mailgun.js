
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

async function userCode() {
    const mailgunApiKey = 'API KEY';
    const mailgunDomain = 'DOMAIN KEY';
    const recipientEmail = {{request.body.email}};
    const subject = 'Message by proShare!';
    const message = {{request.body.message}};
  
    const mailgunUrl = `https://api.mailgun.net/v3/${mailgunDomain}/messages`;
  
    const params = new URLSearchParams();
    params.append('from', 'proShare <tripp@example.com>');
    params.append('to', recipientEmail);
    params.append('subject', subject);
    params.append('text', message);
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${mailgunApiKey}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    };
  
    return fetch(mailgunUrl, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return 'Email sent successfully.';
        } else {
          return 'Failed to send email.';
        }
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        return 'An error occurred while sending the email.';
      });
  }
  
  
  
  
  
  
  