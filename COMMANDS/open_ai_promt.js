
// This node executes a SQL query on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

async function userCode() {
    // OpenAI API endpoint and API key
    const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    const apiKey = 'API KEY';
  
    // prompt to send to GPT-3
    const prompt = {{request.body.prompt}};
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
  
  
    const requestBody = {
      prompt: prompt,
      max_tokens: 300, 
      temperature: 0.5
    };
  
    try {
      // POST request to OpenAI API 
      const response = await fetch(openaiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        
        const data = await response.json();
        if (data !== null && data !== undefined) {
          return data;
        } else {
          console.error('Received null or undefined data from GPT-3.');
          return 'An error occurred while communicating with GPT-3.';
        }
      } else {
        console.error('Error:', response.statusText);
  
        return 'An error occurred while communicating with GPT-3.';
      }
    } catch (error) {
      console.error('Error:', error);
  
      return 'An error occurred while communicating with GPT-3.';
    }
  }
  
  
  
    