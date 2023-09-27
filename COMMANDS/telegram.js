
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
    const tripName = {{request.body.trip_name}}
    const days = {{request.body.days}}
    const date = {{request.body.date}}
    const address = {{request.body.address}}
    const rating = {{request.body.rating}}
    const about = {{request.body.about}}
    const botToken = 'BOT TOKEN'; // Telegram bot token
    const chatId = 'CHAT ID'; // Telegram chat ID
  
    const messageText = `🛩️ <b>${tripName}</b>\n 🗓️ ${days} Days Trip on ${date}\n 📍 ${address}\n ✨ ${rating} Stars\n 📜 ${about}`;
  
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const requestData = {
      chat_id: chatId,
      text: messageText,
      parse_mode: 'HTML',
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };
  
    fetch(telegramApiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to send message to Telegram');
        }
      })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  }