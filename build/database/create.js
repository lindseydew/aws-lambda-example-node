"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
(async () => {
    const dynamodbClient = new client_dynamodb_1.DynamoDBClient({ endpoint: 'http://localhost:8000', region: 'local' });
    const createTable = new client_dynamodb_1.CreateTableCommand({
        TableName: "ExampleOne",
        KeySchema: [
            { AttributeName: "userId", KeyType: "HASH" },
            { AttributeName: "item", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "userId", AttributeType: "S" },
            { AttributeName: "item", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    });
    try {
        const result = await dynamodbClient.send(createTable);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
})();
//# sourceMappingURL=create.js.map