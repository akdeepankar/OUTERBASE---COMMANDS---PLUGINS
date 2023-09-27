
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
    const trip_name = {{request.body.trip_name}}
    const days = {{request.body.days}}
    const date = {{request.body.date}}
    const address = {{request.body.address}}
    const rating = {{request.body.rating}}
    const about = {{request.body.about}}
    const webhookUrl = 'DISCORD WEBHOOK URL';
  
    const data = {
    username: 'Tripp',
    content: ':airplane_small: ' + trip_name,
    embeds: [
      {
        title: ':sparkles: ' + days + ' Days Trip from :date: ' + date + ' :round_pushpin: ' + address + ' :stars: ' + rating + ' Stars',
        description: about,
      },
    ],
    };
  
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    fetch(webhookUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to send message to Discord');
        }
      })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  }