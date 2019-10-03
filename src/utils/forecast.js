request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/abf6f96036594ee661383198828314ba/${longitude},${latitude}?units=ca`;

    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service", undefined);
      } else if (body.error) {
        callback("Unable to find coordinates", undefined);
      } else {
        callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees C, the chance of rain is ${body.currently.precipProbability}. Today's high is ${body.daily.data[0].temperatureHigh}, low is ${body.daily.data[0].temperatureLow} degrees C.`)
      }
    });
}

module.exports = forecast
