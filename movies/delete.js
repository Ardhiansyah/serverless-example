const docClient = require('../aws-sdk.config').docClient;

module.exports.delete = (event, context, callback) => {
  let params = {
    TableName: 'Movies',
    Key: {
      year: 2018,
      title: 'The Big New Movie'
    },
    ConditionExpression: 'info.rating <= :val',
    ExpressionAttributeValues: {
      ":val": 5.5
    }
  };

  docClient.delete(params, (err, data) => {
    if (err) {
      console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t delete the movie.'
      });
      return;
    }
    
    let response = {
      statusCode: 200,
      body: JSON.stringify(data)
    };

    callback(null, response);
  })
}