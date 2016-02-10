var $ = require('jquery');
var WeatherApp = require('./WeatherApp.js');
console.log(WeatherApp);
var app = new WeatherApp();

$(function(){
    app.run();
});