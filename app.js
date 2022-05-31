const express = require('express');
const port = 3000;
const app = express();
const https = require('https');


app.get('/', (req, res) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Honolulu&appid=4e31576d3e6d03bca50c447735807cd0&units=metric';
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
    });
  });
  res.send('Server is up and running.');
});


app.listen(port, () => {
  console.log(`Weather Project listening on port ${port}.`);
});
