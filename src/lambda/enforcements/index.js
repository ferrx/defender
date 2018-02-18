const request = require('request');

exports.handler = (event, context, callback) => {
  let params = event['pathParameters'];
  let queryStrings = event['queryStringParameters'];

  if (params.callType === 'food') {
    request.get('https://api.fda.gov/food/enforcement.json?limit=10', function (error, response, body) {

      var response = {
        "statusCode": 200,
        "headers": {
          "my_header": "my_value"
        },
        "body": JSON.stringify(body),
        "isBase64Encoded": false
      };
      callback(null, response);
    });
  }
};
