var $ = require('jquery');

var DataProvider = function(){
    this.success = null;
    this.error = null;
    this.jsonpCallbackName = 'yahooForecastJSONPCallback';
};

/**
 * Create in passed object callback-function for Yahoo JSONP API calls
 * @param w
 */
DataProvider.prototype.reqisterJSONPCallback = function(w){
    w.yahooForecastJSONPCallback = $.proxy(function(data){
        if (typeof data === 'string') {
            data = $.parseJSON(data);
        }
        if (data.query.results.channel.item.forecast) {
            this.success.call(null, data);
        } else {
            this.error.call();
        }
    }, this);
};

/**
 *
 * @param {function} callback called after success retrieving data from Yahoo
 */
DataProvider.prototype.setSuccessCallback = function(callback){
    this.success = callback;
};

/**
 * @param {function} callback called after failed retrieving data from Yahoo
 */
DataProvider.prototype.setErrorCallback = function(callback){
    this.error = callback;
};

/**
 * Load weather data for passed city by JSONP
 * @param {string} city
 */
DataProvider.prototype.loadWeatherDataByCity = function(city){
    $('#yahoo').remove();
    $('body').append("<script id=\"yahoo\" src=\"https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+"')&format=json&callback="+this.jsonpCallbackName+"\"></script>");
};

module.exports = DataProvider;