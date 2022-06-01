const express = require('express');
const port = 3000;
const app = express();
const https = require('node:https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const apiKey = "4e31576d3e6d03bca50c447735807cd0";
  const units = "metric";
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units='+units;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The temperature in ${query} is ${temp}&#176C.</h1>`);
      res.write(`<h2>The weather is currently ${weatherDescription}.</h2>`);
      res.write(`<img src=${imageURL} alt="Current weather icon">`);
      res.send();
    });
  });
})

app.listen(port, () => {
  console.log(`Weather Project listening on port ${port}.`);
});
