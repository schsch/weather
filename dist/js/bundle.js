webpackJsonp([0],[function(t,e,o){var r=o(1),i=o(2);console.log(i);var a=new i;r(function(){a.run()})},,function(t,e,o){var r=o(1),i=o(3),a=o(6),s=function(){};s.prototype.run=function(){this.viewModel=this.initViewModel(),this.dataProvider=this.initDataProvider(this.viewModel),this.$city=r("#city"),this.$city.on("change",r.proxy(function(){this.reloadData()},this)),this.reloadData()},s.prototype.initViewModel=function(){var t={};return t.forecast=i.observableArray([]),t.forecast.extend({rateLimit:50}),i.applyBindings(t),t},s.prototype.initDataProvider=function(t){var e=new a;return e.reqisterJSONPCallback(window),e.setSuccessCallback(r.proxy(function(t){this.viewModel.forecast.removeAll();for(var e=t.query.results.channel.item.forecast,o=0;o<e.length;o++)this.viewModel.forecast.push(e[o]);this.$city.removeAttr("disabled")},this)),e.setErrorCallback(r.proxy(function(){this.viewModel.forecast.removeAll(),this.$city.removeAttr("disabled"),alert("Error! Can not retrieving data from Yahoo")},this)),e},s.prototype.reloadData=function(){this.$city.attr("disabled","disabled"),this.dataProvider.loadWeatherDataByCity(this.$city.val())},t.exports=s},,,,function(t,e,o){var r=o(1),i=function(){this.success=null,this.error=null,this.jsonpCallbackName="yahooForecastJSONPCallback"};i.prototype.reqisterJSONPCallback=function(t){t.yahooForecastJSONPCallback=r.proxy(function(t){"string"==typeof t&&(t=r.parseJSON(t)),t.query.results.channel.item.forecast?this.success.call(null,t):this.error.call()},this)},i.prototype.setSuccessCallback=function(t){this.success=t},i.prototype.setErrorCallback=function(t){this.error=t},i.prototype.loadWeatherDataByCity=function(t){r("#yahoo").remove(),r("body").append('<script id="yahoo" src="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\''+t+"')&format=json&callback="+this.jsonpCallbackName+'"></script>')},t.exports=i}]);