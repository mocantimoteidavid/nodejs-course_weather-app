const request = require("postman-request");

const forecast = (lat, lon, callback) => {
    if (!lat || !lon) {
        callback("Coordinates error.");
    } else {
        const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_ACCESS_KEY}&query=${lat},${lon}&units=m`;

        request({ url, json: true }, (error, { body: resBody } = {}) => {
            if (error) {
                callback("Unexpected error.");
            } else if (resBody.error) {
                callback("Couldn't find location.");
            } else {
                const output = `${resBody.current.weather_descriptions[0]}. It is currently ${resBody.current.temperature} degrees out. It feels like ${resBody.current.feelslike} out. The observation time was ${resBody.current.observation_time}.`;
                callback(undefined, output);
            }   
        });
    }
    
}


module.exports = forecast;
