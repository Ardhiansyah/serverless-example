const docClient = require('../aws-sdk.config').docClient;

module.exports.create = (event, context, callback) => {
  let params = {
    TableName: 'Movies',
    Item: {
      year: 2018,
      title: 'The Big New Movie',
      info: {
        plot: 'Nothing happens at all.',
        rating: 0
      }
    }
  };

  console.log('Adding a new item.');

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t add new movie.'
      });
      return;
    }
    
    let response = {
      statusCode: 201,
      body: JSON.stringify(data)
    };

    callback(null, response);

  });
};