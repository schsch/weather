var $ = require('jquery');
var ko = require('knockout');
var DataProvider = require('./DataProvider.js');


var WeatherApp = function(){

};

WeatherApp.prototype.run = function(){

    this.viewModel    = this.initViewModel();
    this.dataProvider = this.initDataProvider(this.viewModel);
    this.$city = $('#city');

    this.$city.on('change', $.proxy(function(){
        this.reloadData();
    }, this));

    this.reloadData();
};

WeatherApp.prototype.initViewModel = function(){
    var viewModel = {};
    viewModel.forecast = ko.observableArray([]);
    viewModel.forecast.extend({ rateLimit: 50 });
    ko.applyBindings(viewModel);
    return viewModel;
};

WeatherApp.prototype.initDataProvider = function(viewModel){

    var dataProvider = new DataProvider();
    dataProvider.reqisterJSONPCallback(window);

    dataProvider.setSuccessCallback($.proxy(function(data){
        this.viewModel.forecast.removeAll();
        var items = data.query.results.channel.item.forecast;
        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
            this.viewModel.forecast.push(items[i]);
        }
    }, this));

    dataProvider.setErrorCallback($.proxy(function(){
        this.viewModel.forecast.removeAll();
    }, this));

    return dataProvider;
};

WeatherApp.prototype.reloadData = function(){
    this.dataProvider.loadWeatherDataByCity(this.$city.val());
};

module.exports = WeatherApp;