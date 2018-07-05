const docClient = require('../aws-sdk.config').docClient;

module.exports.update = (event, context, callback) => {
  let params = {
    TableName: 'Movies',
    Key: {
      year: 2018,
      title: 'The Big New Movie'
    },
    UpdateExpression: 'set info.rating = :r, info.plot = :p, info.actors = :a',
    ExpressionAttributeValues: {
      ":r": 5.5,
      ":p": "Everything happens all at once.",
      ":a": ["Larry", "Moe", "Curly"]
    },
    ReturnValues: "UPDATED_NEW"
  };

  docClient.update(params, (err, data) => {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the movie.'
      });
      return;
    }
    
    let response = {
      statusCode: 200,
      body: JSON.stringify(data)
    };

    callback(null, response);
  });
}
