"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
// const client = new DynamoDBClient(config);
(async () => {
    var _a, _b;
    const dynamodbClient = new client_dynamodb_1.DynamoDBClient({ endpoint: 'http://localhost:8000', region: 'local' });
    const putCommands = ["football", "sport", "hello"].map((v, idx) => new client_dynamodb_1.PutItemCommand({
        TableName: 'ExampleOne',
        Item: {
            "userId": {
                S: "1"
            },
            "item": {
                S: v
            },
            "position": {
                N: idx.toString()
            }
        }
    }));
    await Promise.all(putCommands.map(p => dynamodbClient.send(p)));
    const queryCommand = new client_dynamodb_1.QueryCommand({
        TableName: 'ExampleOne',
        KeyConditions: {
            "userId": {
                ComparisonOperator: "EQ",
                AttributeValueList: [
                    { S: '1' }
                ]
            }
        }
    });
    const results = await dynamodbClient.send(queryCommand);
    console.log((_a = results.Items) === null || _a === void 0 ? void 0 : _a.map(r => JSON.stringify(r)));
    const updateCommand = new client_dynamodb_1.UpdateItemCommand({
        TableName: 'ExampleOne',
        Key: {
            "userId": {
                S: "1"
            },
            item: {
                S: "sport"
            }
        },
        AttributeUpdates: {
            "position": {
                Value: {
                    N: "4"
                }
            }
        }
    });
    await dynamodbClient.send(updateCommand);
    const updatedResults = await dynamodbClient.send(queryCommand);
    console.log((_b = updatedResults.Items) === null || _b === void 0 ? void 0 : _b.map(r => JSON.stringify(r)));
})();
//# sourceMappingURL=query.js.map