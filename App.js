const express = require('express');
const https = require('https');
const Bodyparser = require('body-parser');

const app = express();
app.use(Bodyparser.urlencoded({ extended: true }));

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res) {


    const appkey = 'abf6ce1bb4cda70fed541e249a0c0ee0'
    const querry = req.body.CityName;
    const unit = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + querry + '&appid=' + appkey + '&units=' + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on('data', function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

            res.write('<p>the weather is currently  ' + description + '</p>');
            res.write('<h1>The temperature in ' + querry + ' is ' + temp + ' degrees Celcius.</h1>');
            res.write('<img src=' + imageURL + '>');
            res.send();
        })
    })

})

app.listen(3000, function () {
    console.log('server is running on port 3000');
})
