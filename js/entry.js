var $ = require('jquery');
var WeatherApp = require('./WeatherApp.js');
var app = new WeatherApp();

$(function(){
    app.run();
});
