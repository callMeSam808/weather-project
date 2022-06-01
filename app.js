const express = require('express');
const port = 3000;
const app = express();
const https = require('node:https');


app.get('/', (req, res) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Honolulu&appid=4e31576d3e6d03bca50c447735807cd0&units=metric';
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<h1>The temperature in Honolulu is ${temp}&#176C.</h1>`);
      res.write(`<h2>The weather is currently ${weatherDescription}.</h2>`);
      res.write(`<img src=${imageURL} alt="Current weather icon">`);
      res.send();
    });
  });
});


app.listen(port, () => {
  console.log(`Weather Project listening on port ${port}.`);
});
