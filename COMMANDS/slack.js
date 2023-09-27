
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
    const webhookUrl = 'SLACK WEBHOOK URL';

    const data = {
        text: '🛩️' + {{request.body.trip_name}},
        attachments: [
            {
                //title: {{request.body.trip_name}},
                fields: [
                    { title: '⏳ Days', value: {{request.body.days}}, short: true },
                    { title: '🗓️ Date', value: {{request.body.date}}, short: true },
                    { title: '📍 Address', value: {{request.body.address}}, short: true },
                    { title: '✨ Rating', value: {{request.body.rating}}, short: true },
                    { title: '📜 About', value: {{request.body.about}} },
                ],
            },
        ],
    };

    // Define the request options
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
        throw new Error('Failed to send message to Slack');
      }
    })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.error(error);
    });
}