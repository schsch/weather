var DataProvider = function(){
    this.success = null;
    this.error = null;
};

DataProvider.prototype.reqisterJSONPCallback = function(w){

};

DataProvider.prototype.setSuccessCallback = function(callback){
    this.success = callback;
};

DataProvider.prototype.setErrorCallback = function(callback){
    this.error = callback;
};

DataProvider.prototype.loadWeatherDataByCity = function(city){
    this.success.call(null, {
        query:{
            results:{
                channel:{
                    item:{
                        forecast:[
                            {
                                "code": "32",
                                "date": "10 Feb 2016",
                                "day": "Wed",
                                "high": "24",
                                "low": "9",
                                "text": "Sunny " + city
                            },
                            {
                                "code": "30",
                                "date": "11 Feb 2016",
                                "day": "Thu",
                                "high": "13",
                                "low": "2",
                                "text": "Partly Cloudy " + city
                            },
                            {
                                "code": "32",
                                "date": "12 Feb 2016",
                                "day": "Fri",
                                "high": "5",
                                "low": "0",
                                "text": "Sunny "  + city
                            },
                            {
                                "code": "28",
                                "date": "13 Feb 2016",
                                "day": "Sat",
                                "high": "15",
                                "low": "11",
                                "text": "Mostly Cloudy "  + city
                            },
                            {
                                "code": "28",
                                "date": "14 Feb 2016",
                                "day": "Sun",
                                "high": "19",
                                "low": "14",
                                "text": "Mostly Cloudy "  + city
                            }
                        ]
                    }
                }
            }
        }
    });
};

module.exports = DataProvider;