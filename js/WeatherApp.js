var $ = require('jquery');
var ko = require('knockout');
var DataProvider = require('./DataProvider.js');

var WeatherApp = function(){};

/**
 * Init and run application
 */
WeatherApp.prototype.run = function(){

    this.viewModel    = this.initViewModel();
    this.dataProvider = this.initDataProvider(this.viewModel);
    this.$city = $('#city');

    this.$city.on('change', $.proxy(function(){
        this.reloadData();
    }, this));

    this.reloadData();
};

/**
 * Create knockout view-model object and apply bindings
 * @returns {{}}
 */
WeatherApp.prototype.initViewModel = function(){
    var viewModel = {};
    viewModel.forecast = ko.observableArray([]);
    viewModel.forecast.extend({ rateLimit: 50 });
    ko.applyBindings(viewModel);
    return viewModel;
};

/**
 * Create object for retrieving data from Yahoo
 * @param viewModel knockout view-model object
 * @returns {DataProvider}
 */
WeatherApp.prototype.initDataProvider = function(viewModel){

    var dataProvider = new DataProvider();
    dataProvider.reqisterJSONPCallback(window);

    dataProvider.setSuccessCallback($.proxy(function(data){
        this.viewModel.forecast.removeAll();
        var items = data.query.results.channel.item.forecast;
        for (var i=0; i<items.length; i++) {
            this.viewModel.forecast.push(items[i]);
        }
        this.$city.removeAttr('disabled');
    }, this));

    dataProvider.setErrorCallback($.proxy(function(){
        this.viewModel.forecast.removeAll();
        this.$city.removeAttr('disabled');
        alert('Error! Can not retrieving data from Yahoo');
    }, this));

    return dataProvider;
};

/**
 * Reload weather data for current city
 */
WeatherApp.prototype.reloadData = function(){
    this.$city.attr('disabled', 'disabled');
    this.dataProvider.loadWeatherDataByCity(this.$city.val());
};

module.exports = WeatherApp;