const request = require('request');

var formatDate = function (date) {
  var yyyy = date.getFullYear();
  var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var dd = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate();
  return yyyy.toString() + mm.toString() + dd.toString();
}

exports.handler = (event, context, callback) => {
  let queryStrings = event['queryStringParameters'];

  //get today - 90 days
  let currentDate = new Date();
  let formattedCurDate = formatDate(currentDate);
  currentDate.setDate(currentDate.getDate() - 180);
  let formattedPrevDate = formatDate(currentDate);

  let queryString = "?api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&limit=100";
  queryString += "&search=report_date:[" + formattedPrevDate + "+TO+" + formattedCurDate + "]";

  if (queryStrings && queryStrings.search) {
    queryString += "+AND+(" + queryStrings.search + ")";
  }

  let apiUrl = 'https://api.fda.gov/' + queryStrings.type + '/enforcement.json';
  apiUrl += queryString;

  request.get(apiUrl, function (error, response, body) {
    var response = {
      "statusCode": 200,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify(body),
      "isBase64Encoded": false
    };
    callback(null, response);
  });
};
