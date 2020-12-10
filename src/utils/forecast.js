const request = require("request");
const forecast = (lang, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/22a4b3db13af73dbbc1f3b257c500b44/" +
    long +
    "," +
    lang +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
      console.log(body.currently)
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        {body:body.daily.data[0].summary +
          "It is curently " +
          body.currently.temperature +
          " and there is a " +
          body.currently.precipProbability +
          "% for percipication",
        temp:body.currently.temperature,
        time:body.currently.time
        
        }
      );
    }
  });
};
module.exports = forecast;
