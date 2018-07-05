const docClient = require('../aws-sdk.config').docClient;

module.exports.list = (event, context, callback) => {
  let params = {
    TableName: 'Movies',
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: {
      '#yr': 'year'
    },
    ExpressionAttributeValues: {
      ':yyyy': 2000
    }
  };
  
  docClient.query(params, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the movie.'
      });
      return;
    }

    console.log('Query Succeeded.');

    let response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };

    callback(null, response);
  });
}
