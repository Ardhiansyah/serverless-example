require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY
});

module.exports = {
  dynamodb: new AWS.DynamoDB(),
  docClient: new AWS.DynamoDB.DocumentClient(),
}